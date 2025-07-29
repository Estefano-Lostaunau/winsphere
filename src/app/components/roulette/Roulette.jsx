import React, { useState, useRef, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import FloatingPanel from './FloatingPanel';
import spinSound from '/public/sounds/sound_roulette3.mp3';
import winSound from '/public/sounds/sound_roulettewins.mp3';
import prewinSound from '/public/sounds/prespin.mp3';
import { useIntl } from 'react-intl';

const LOCAL_STORAGE_KEY = 'rouletteNames';
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds

export const Roulette = () => {
    const [textareaValue, setTextareaValue] = useState('');
    const [prizes, setPrizes] = useState([]);
    const [mustSpin, setMustSpin] = useState(false);
    const [winnerIndex, setWinnerIndex] = useState(null);
    const [messageId, setMessageId] = useState('');
    const [messageParams, setMessageParams] = useState({});
    const [messageType, setMessageType] = useState('');
    const [winners, setWinners] = useState([]);
    const [numWinners, setNumWinners] = useState(1);
    const [isRaffleActive, setIsRaffleActive] = useState(false);
    const [predefinedWinners, setPredefinedWinners] = useState([]);
    const [showAdminPanel, setShowAdminPanel] = useState(false);
    const [nextPrizes, setNextPrizes] = useState([]);
    const [showTestSpinModal, setShowTestSpinModal] = useState(false);
    const [isFirstSpin, setIsFirstSpin] = useState(true);
    const [testSpinCount, setTestSpinCount] = useState(0);
    const [showWinnersAfterTestSpins, setShowWinnersAfterTestSpins] = useState(0);
    const [unlimitedWinners, setUnlimitedWinners] = useState(false);
    const [enableTestSpin, setEnableTestSpin] = useState(false);

    const soundRef = useRef(new Audio(spinSound));
    const winSoundRef = useRef(new Audio(winSound));
    const prewinSoundRef = useRef(new Audio(prewinSound));
    const intervalRef = useRef(null);

    const vibrantRainbowColors = [
        '#FF6F61', '#FFB347', '#66FF66', '#66FFFF', '#66B2FF', '#B266FF',
        '#FF3366', '#FF6633', '#33FF99', '#33CCFF', '#3399FF', '#9933FF',
        '#FF66CC', '#FF9966', '#99FF66', '#FFFF33'
    ];


    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const intl = useIntl();

    useEffect(() => {
        //console.log('storedAdminData', localStorage.getItem('adminPanelData'));
        //console.log(localStorage.getItem('numWinners'));
        //console.log(localStorage.getItem('unlimitedWinners'));
        const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedData) {
            const { names, timestamp } = storedData;
            const currentTime = new Date().getTime();
            if (currentTime - timestamp < EXPIRATION_TIME) {
                setTextareaValue(names.join('\n'));
                setPrizes(
                    names.map((name, index) => ({
                        option: name,
                        id: index,
                        style: {
                            backgroundColor: vibrantRainbowColors[index % vibrantRainbowColors.length],
                            textColor: '#000000',
                        },
                    }))
                );
            } else {
                localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
        }


        const storedUnlimitedWinners = JSON.parse(localStorage.getItem('unlimitedWinners'));
        if (storedUnlimitedWinners) {
            const { unlimitedWinners, timestamp } = storedUnlimitedWinners;
            const currentTime = new Date().getTime();
            if (currentTime - timestamp < EXPIRATION_TIME) {
                setUnlimitedWinners(unlimitedWinners);
                if (unlimitedWinners && storedData) {
                    setNumWinners(storedData.names.length);
                }
            } else {
                localStorage.removeItem('unlimitedWinners');
            }
        }

        //console.log('storedAdminData', localStorage.getItem('adminPanelData'));
        const storedAdminData = JSON.parse(localStorage.getItem('adminPanelData'));
        if (storedAdminData) {
            const { winners, showWinnersAfter, timestamp } = storedAdminData;
            const currentTime = new Date().getTime();
            if (currentTime - timestamp < EXPIRATION_TIME) {
                setPredefinedWinners(winners);
                setShowWinnersAfterTestSpins(showWinnersAfter);
            } else {
                localStorage.removeItem('adminPanelData');
            }
        }
    }, []);

    useEffect(() => {
        if (!loading && !user && location.pathname === '/roulette/panel') {
            navigate('/login', { state: { from: location } });
        } else if (user && location.pathname === '/roulette/panel') {
            setShowAdminPanel(true);
        }
    }, [user, loading, location, navigate]);


    const handleTextareaChange = (e) => {
        const value = e.target.value;
        setTextareaValue(value);

        const names = value.split('\n').filter((line) => line.trim() !== '');
        const maxWinners = Math.max(names.length - 1, 0);

        if (numWinners > maxWinners) {
            setNumWinners(maxWinners);
        }
        setPrizes(
            names.map((name, index) => ({
                option: name.trim(),
                id: index,
                style: {
                    backgroundColor: vibrantRainbowColors[index % vibrantRainbowColors.length],
                    textColor: '#000000',
                },
            }))
        );

        setWinners([]);
        setIsRaffleActive(false);

        const dataToStore = {
            names,
            timestamp: new Date().getTime(),
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));
        setIsFirstSpin(true);
    };

    const handleNumWinnersChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0 && value < prizes.length) {
            setNumWinners(value);
            setWinners([]);
            setIsRaffleActive(false);
            setIsFirstSpin(true);

        } else if (e.target.value === '') {
            setNumWinners('');
        }
    };

    const handleUnlimitedWinnersChange = (e) => {
        const isChecked = e.target.checked;
        setUnlimitedWinners(isChecked);

        if (isChecked) {
            setWinners([]);

            setNumWinners(prizes.length);
        }

        const unlimitedWinnersData = {
            unlimitedWinners: isChecked,
            timestamp: new Date().getTime(),
        };
        localStorage.setItem('unlimitedWinners', JSON.stringify(unlimitedWinnersData));
    };

    const handleEnableTestSpinChange = (e) => {
        const isChecked = e.target.checked;
        setEnableTestSpin(isChecked);

        if (!isChecked) {
            setIsFirstSpin(false);
            setTestSpinCount(0);
        } else {
            setIsFirstSpin(true);
            setTestSpinCount(0);
        }
    };

    const playSoundWithDynamicSpeed = () => {
        const sound = soundRef.current;
        prewinSoundRef.current.play(); // Sonido previo al giro

        // Reiniciar el sonido del spin antes de reproducirlo
        sound.pause();
        sound.currentTime = 0; // Reiniciar al principio
        sound.loop = true;

        // Retrasar el inicio del sonido por 1 segundo
        setTimeout(() => {
            sound.play();
            let playbackRate = 1;

            // Cambiar la velocidad de reproducción gradualmente
            intervalRef.current = setInterval(() => {
                playbackRate *= 0.99; // Reducir la velocidad gradualmente
                sound.playbackRate = playbackRate;

                // Si la velocidad es demasiado baja, detener los ajustes
                if (playbackRate < 0.3) {
                    clearInterval(intervalRef.current);
                }
            }, 400); // Ajustar la velocidad cada 300ms
        }, 700); // Esperar 1 segundo antes de reproducir el sonido
    };

    const stopSound = () => {
        clearInterval(intervalRef.current);
        const sound = soundRef.current;
        sound.pause();
        sound.currentTime = 0; // Reiniciar el sonido para el próximo uso
    };

    const playWinSound = () => {
        const winSound = winSoundRef.current;
        winSound.currentTime = 0; // Asegurar que comience desde el principio
        winSound.play();
    };

    const spinWheel = () => {
        console.log('storedAdminData', localStorage.getItem('adminPanelData'));
        console.log(localStorage.getItem('numWinners'));
        console.log(localStorage.getItem('unlimitedWinners'));

        if (!isRaffleActive) {
            if (!unlimitedWinners && prizes.length <= numWinners) {
                setMessageId('number_of_winners_error');
                setMessageParams({});
                setMessageType('error');
                return;
            }
            setIsRaffleActive(true);
        }

        if (winners.length < numWinners) {
            let winnerIndex = -1;
            if (predefinedWinners[winners.length] && testSpinCount >= showWinnersAfterTestSpins - 1) {
                winnerIndex = prizes.findIndex(prize => prize.option === predefinedWinners[winners.length]);
            }
            if (winnerIndex === -1) {
                winnerIndex = Math.floor(Math.random() * prizes.length);
            }
            setWinnerIndex(winnerIndex);
            setMustSpin(true);
            setMessageId(''); // Limpiar mensaje
            setMessageParams({});
            playSoundWithDynamicSpeed();
        } else if (winners.length >= numWinners) {
            setMessageId('all_winners_selected');
            setMessageParams({});
            setMessageType('error');
        } else {
            setMessageId('add_names_to_spin');
            setMessageParams({});
            setMessageType('error');
        }
    };


    const updateLocalStorage = (updatedPrizes) => {
        const dataToStore = {
            names: updatedPrizes.map((prize) => prize.option),
            timestamp: new Date().getTime(),
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));

        const dataUnlimitedWinners = {
            unlimitedWinners,
            timestamp: new Date().getTime(),
        };
        localStorage.setItem('unlimitedWinners', JSON.stringify(dataUnlimitedWinners));
    };

    const clearLocalStorage = () => {
        localStorage.removeItem('unlimitedWinners');
        setUnlimitedWinners(false);
    };

    const handleStopSpinning = () => {
        if (winnerIndex === null || winnerIndex < 0 || winnerIndex >= prizes.length) {
            setMessageId('winner_error');
            setMessageParams({});
            setMessageType('error');
            setMustSpin(false);
            stopSound();
            return;
        }

        const winner = prizes[winnerIndex];
        setMustSpin(false);
        stopSound(); // Stop spinning sound
        playWinSound(); // Play the win sound
        const selectedWinner = winner.option;

        if (isFirstSpin && enableTestSpin) {
            setShowTestSpinModal(true);
        } else {
            setWinners((prevWinners) => [...prevWinners, selectedWinner]);

            // Eliminar el ganador inmediatamente después de seleccionarlo
            const updatedPrizes = prizes.filter((_, index) => index !== winnerIndex);
            setPrizes(updatedPrizes);
            setTextareaValue(updatedPrizes.map((prize) => prize.option).join('\n'));

            // Actualizar el local storage
            updateLocalStorage(updatedPrizes);

            if (winners.length + 1 === numWinners) {
                setMessageId('all_winners_selected');
                setMessageParams({});
                setMessageType('success');
                setIsRaffleActive(false);
                setIsFirstSpin(true); // Resetear para la próxima partida

                // Borrar numWinners y unlimitedWinners del local storage y desmarcar la checkbox
                clearLocalStorage();
            } else {
                setMessageId('winner_is');
                setMessageParams({ winner: selectedWinner });
                setMessageType('success');
            }
        }
    };

    const handleTestSpinModalResponse = (isCountAsWinner) => {
        setShowTestSpinModal(false);

        if (isCountAsWinner) {
            const selectedWinner = prizes[winnerIndex].option;
            setWinners((prevWinners) => [...prevWinners, selectedWinner]);

            const updatedPrizes = prizes.filter((_, index) => index !== winnerIndex);
            setPrizes(updatedPrizes);
            setTextareaValue(updatedPrizes.map((prize) => prize.option).join('\n'));

            // Actualizar el local storage
            updateLocalStorage(updatedPrizes);

            if (winners.length + 1 === numWinners) {
                setMessageId('all_winners_selected');
                setMessageParams({});
                setMessageType('success');
                setIsRaffleActive(false);
                setIsFirstSpin(true); // Resetear para la próxima partida
                // Borrar numWinners y unlimitedWinners del local storage y desmarcar la checkbox
                clearLocalStorage();
            } else {
                setMessageId('winner_is');
                setMessageParams({ winner: selectedWinner });
                setMessageType('success');
                setIsFirstSpin(false); // No mostrar el modal en la siguiente jugada
            }
        } else {
            setMessageId('spin_not_count');
            setMessageParams({});
            setMessageType('error');
            setIsFirstSpin(true); // Mostrar el modal en la siguiente jugada
        }

        setTestSpinCount(prevCount => prevCount + 1);
    };

    useEffect(() => {
        if (!mustSpin && nextPrizes.length > 0) {
            setPrizes(nextPrizes);
            setTextareaValue(nextPrizes.map((prize) => prize.option).join('\n'));
            setNextPrizes([]);
        }
    }, [mustSpin, nextPrizes]);

    useEffect(() => {
        return () => {
            // Cleanup on component unmount
            clearInterval(intervalRef.current);
            const sound = soundRef.current;
            sound.pause();
            sound.currentTime = 0;
            const winSound = winSoundRef.current;
            winSound.pause();
            winSound.currentTime = 0;
        };
    }, []);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };


    return (
        <div className="flex flex-col items-center my-28">
            <h1 className="text-3xl font-semibold mb-6">{intl.formatMessage({ id: 'raffle_wheel' })}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl px-4">
                {/* Panel izquierdo - Controles */}
                <div className="flex flex-col space-y-6">
                    {/* Textarea para nombres */}
                    <div className="space-y-2">
                        <label htmlFor="namesTextarea" className="block text-lg font-semibold text-gray-700">
                            {intl.formatMessage({ id: 'names_label' })}
                        </label>
                        <textarea
                            id="namesTextarea"
                            value={textareaValue}
                            onChange={handleTextareaChange}
                            placeholder={intl.formatMessage({ id: 'placeholder_roulette' })}
                            rows="6"
                            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm focus:ring-2 focus:ring-rose-400 focus:border-rose-400 focus:outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={mustSpin}
                        />
                    </div>

                    {/* Configuración de ganadores */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="numWinners" className="block text-lg font-semibold text-gray-700">
                                {intl.formatMessage({ id: 'number_of_winners' })}
                            </label>
                            <input
                                id="numWinners"
                                type="number"
                                value={unlimitedWinners ? prizes.length : numWinners}
                                onChange={handleNumWinnersChange}
                                min="1"
                                max={prizes.length - 1}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:ring-2 focus:ring-rose-400 focus:border-rose-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isRaffleActive || mustSpin || unlimitedWinners}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="unlimitedWinners"
                                    checked={unlimitedWinners}
                                    onChange={handleUnlimitedWinnersChange}
                                    className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 rounded focus:ring-rose-500 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={mustSpin}
                                />
                                <label htmlFor="unlimitedWinners" className="text-lg font-semibold text-gray-700">
                                    {intl.formatMessage({ id: 'unlimited_winners' })}
                                </label>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="enableTestSpin"
                                    checked={enableTestSpin}
                                    onChange={handleEnableTestSpinChange}
                                    className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 rounded focus:ring-rose-500 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={mustSpin}
                                />
                                <label htmlFor="enableTestSpin" className="text-lg font-semibold text-gray-700">
                                    {intl.formatMessage({ id: 'enable_test_spin' })}
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Botón de girar */}
                    <button
                        onClick={spinWheel}
                        className="w-full inline-block rounded-lg bg-rose-600 px-8 py-4 text-lg font-medium text-white transition hover:bg-rose-700 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={prizes.length === 0 || winners.length === numWinners || mustSpin || (unlimitedWinners === false && (numWinners === '' || numWinners <= 0))}
                    >
                        {intl.formatMessage({ id: 'spin_the_wheel' })}
                    </button>

                    {/* Mensajes de estado */}
                    <div className="min-h-[3rem]">
                        {messageId && (
                            <div className={`p-4 rounded-lg font-semibold text-center ${messageType === 'success'
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : 'bg-red-100 text-red-700 border border-red-200'
                                }`}>
                                {intl.formatMessage({ id: messageId }, messageParams)}
                            </div>
                        )}
                    </div>

                    {/* Lista de ganadores */}
                    {winners.length > 0 && (
                        <div className="space-y-3">
                            <h2 className="text-xl font-semibold text-gray-700">
                                {intl.formatMessage({ id: 'winners' })}:
                            </h2>
                            <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                                <ul className="space-y-2">
                                    {winners.map((winner, index) => (
                                        <li key={index} className="flex items-center space-x-2">
                                            <span className="flex-shrink-0 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                                {index + 1}
                                            </span>
                                            <span className="text-gray-700 font-medium">{winner}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Panel derecho - Ruleta */}
                <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center w-[445px] max-w-[445px] aspect-square rounded-full shadow-xl z-0">
                        {prizes.length > 0 ? (
                            <Wheel
                                mustStartSpinning={mustSpin}
                                prizeNumber={winnerIndex}
                                data={prizes.map((prize) => ({
                                    ...prize,
                                    option: truncateText(prize.option, 16),
                                }))}
                                onStopSpinning={handleStopSpinning}
                                radiusLineWidth={0}
                                outerBorderWidth={5}
                                outerBorderColor="white"
                                textColors={['#000000']}
                                fontSize={16}
                            />
                        ) : (
                            <div className="text-center text-lg text-rose-500">
                                {intl.formatMessage({ id: 'please_enter_names' })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showAdminPanel && (
                <FloatingPanel
                    numWinners={numWinners}
                    setPredefinedWinners={setPredefinedWinners}
                    onClose={() => setShowAdminPanel(false)}
                    setShowWinnersAfterTestSpins={setShowWinnersAfterTestSpins}
                />
            )}

            {showTestSpinModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">
                            {intl.formatMessage({ id: 'test_spin' })}
                        </h2>
                        <p className="mb-6 text-gray-600">
                            {intl.formatMessage({ id: 'count_as_winner' })}
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => handleTestSpinModalResponse(true)}
                                className="inline-block rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:outline-none"
                            >
                                {intl.formatMessage({ id: 'yes' })}
                            </button>
                            <button
                                onClick={() => handleTestSpinModalResponse(false)}
                                className="inline-block rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:outline-none"
                            >
                                {intl.formatMessage({ id: 'no' })}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};