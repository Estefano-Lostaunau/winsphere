import React, { useState, useRef, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import AdminPanel from '../admin-panel/AdminPanel';
import spinSound from '/public/sounds/sound_roulette3.mp3';
import winSound from '/public/sounds/sound_roulettewins.mp3';
import prewinSound from '/public/sounds/prespin.mp3';

export const Roulette = () => {
    const [textareaValue, setTextareaValue] = useState('');
    const [prizes, setPrizes] = useState([]);
    const [mustSpin, setMustSpin] = useState(false);
    const [winnerIndex, setWinnerIndex] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [winners, setWinners] = useState([]);
    const [numWinners, setNumWinners] = useState(1);
    const [isRaffleActive, setIsRaffleActive] = useState(false);
    const [predefinedWinners, setPredefinedWinners] = useState([]);
    const [showAdminPanel, setShowAdminPanel] = useState(false);

    const soundRef = useRef(new Audio(spinSound));
    const winSoundRef = useRef(new Audio(winSound));
    const prewinSoundRef = useRef(new Audio(prewinSound));
    const intervalRef = useRef(null);

    const vibrantRainbowColors = [
        '#FF6F61', '#FFB347', '#66FF66', '#66FFFF', '#66B2FF', '#B266FF',
    ];

    const handleTextareaChange = (e) => {
        const value = e.target.value;
        setTextareaValue(value);

        const names = value.split('\n').filter((line) => line.trim() !== '');
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

        setWinners([]);
        setIsRaffleActive(false);
    };

    const handleNumWinnersChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0 && value < prizes.length) {
            setNumWinners(value);
            setWinners([]);
            setIsRaffleActive(false);
        } else if (e.target.value === '') {
            setNumWinners('');
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
        if (!isRaffleActive) {
            if (prizes.length <= numWinners) {
                setMessage('The number of winners must be less than the number of participants.');
                setMessageType('error');
                return;
            }
            setIsRaffleActive(true);
        }

        if (winners.length < numWinners) {
            let winnerIndex = -1;
            if (predefinedWinners[winners.length]) {
                winnerIndex = prizes.findIndex(prize => prize.option === predefinedWinners[winners.length]);
            }
            if (winnerIndex === -1) {
                winnerIndex = Math.floor(Math.random() * prizes.length);
            }
            setWinnerIndex(winnerIndex);
            setMustSpin(true);
            setMessage('');
            playSoundWithDynamicSpeed(); // Start sound when spinning begins
        } else if (winners.length >= numWinners) {
            setMessage('All winners have been selected');
            setMessageType('error');
        } else {
            setMessage('Add at least one name to spin the wheel');
            setMessageType('error');
        }
    };

    const handleStopSpinning = () => {
        const winner = prizes[winnerIndex];
        setMustSpin(false);
        stopSound(); // Stop spinning sound
        playWinSound(); // Play the win sound
        const selectedWinner = prizes[winnerIndex].option;

        const updatedPrizes = prizes.filter((_, index) => index !== winnerIndex);
        setPrizes(updatedPrizes);
        setTextareaValue(updatedPrizes.map((prize) => prize.option).join('\n'));

        setWinners((prevWinners) => [...prevWinners, selectedWinner]);

        setMustSpin(false);

        if (winners.length + 1 === numWinners) {
            setMessage('All winners have been selected!');
            setMessageType('success');
            setIsRaffleActive(false);
        } else {
            setMessage(`The winner is: ${selectedWinner}!`);
            setMessageType('success');
        }
    };

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

    return (
        <div className="flex flex-col items-center my-10">
            <h1 className="text-2xl font-bold mb-6">Raffle Wheel</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-11/12">
                <div className="flex flex-col items-center justify-center">
                    <textarea
                        value={textareaValue}
                        onChange={handleTextareaChange}
                        placeholder="Enter one name per line (one per wheel segment)"
                        rows="6"
                        className="w-2/3 p-3 text-lg border border-gray-300 rounded-lg mb-6"
                    />

                    <div className="flex flex-col items-center mb-6">
                        <label htmlFor="numWinners" className="mb-2 font-semibold text-lg">
                            Number of Winners
                        </label>
                        <input
                            id="numWinners"
                            type="number"
                            value={numWinners}
                            onChange={handleNumWinnersChange}
                            min="1"
                            max={prizes.length - 1}
                            className="w-1/3 p-2 text-lg border border-gray-300 rounded-lg"
                            disabled={isRaffleActive}
                        />
                    </div>

                    <button
                        onClick={spinWheel}
                        className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-600 mb-6"
                        disabled={prizes.length === 0 || winners.length === numWinners}
                    >
                        Spin the Wheel
                    </button>
                    <div className="h-8 mt-4">
                        {message && (
                            <span className={`p-3 text-xl rounded-lg font-semibold 
                            ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </span>
                        )}
                    </div>

                    <div className="mt-4 w-full text-center">
                        <h2 className={`text-lg font-semibold ${winners.length === 0 ? 'invisible' : ''}`}>
                            Winners:
                        </h2>
                        <ul className="h-24 overflow-y-auto">
                            {winners.map((winner, index) => (
                                <li key={index} className="text-md">
                                    Winner {index + 1}: {winner}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex justify-center items-center w-full">
                    <div className="flex justify-center items-center md:w-[445px] max-w-[445px] aspect-square rounded-full shadow-xl">
                        {prizes.length > 0 ? (
                            <Wheel
                                mustStartSpinning={mustSpin}
                                prizeNumber={winnerIndex}
                                data={prizes}
                                onStopSpinning={handleStopSpinning}
                                radiusLineWidth={0}
                                outerBorderWidth={5}
                                outerBorderColor="white"
                                textColors={['#000000']}
                            />
                        ) : (
                            <div className="text-center text-lg text-gray-500">
                                Please enter names to spin the wheel
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 mt-6"
            >
                {showAdminPanel ? 'Hide Admin Panel' : 'Show Admin Panel'}
            </button>

            {showAdminPanel && (
                <AdminPanel numWinners={numWinners} setPredefinedWinners={setPredefinedWinners} />
            )}
        </div>
    );
};