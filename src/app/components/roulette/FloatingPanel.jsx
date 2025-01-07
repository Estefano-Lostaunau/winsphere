import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

const LOCAL_STORAGE_KEY_ADMIN = 'adminPanelData';
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds

const FloatingPanel = ({ numWinners, setPredefinedWinners, onClose, setShowWinnersAfterTestSpins }) => {
    const [winners, setWinners] = useState(Array(numWinners).fill(''));
    const [showWinnersAfter, setShowWinnersAfter] = useState(0);
    const [saveToLocalStorage, setSaveToLocalStorage] = useState(false);
    const [storedWinners, setStoredWinners] = useState([]);
    const navigate = useNavigate();
    const intl = useIntl();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ADMIN));
        if (storedData) {
            const { winners, showWinnersAfter, timestamp } = storedData;
            const currentTime = new Date().getTime();
            if (currentTime - timestamp < EXPIRATION_TIME) {
                setStoredWinners(winners);
                setShowWinnersAfter(showWinnersAfter);
                setShowWinnersAfterTestSpins(showWinnersAfter);
            } else {
                localStorage.removeItem(LOCAL_STORAGE_KEY_ADMIN);
            }
        }
    }, [setShowWinnersAfterTestSpins]);

    useEffect(() => {
        setWinners(Array(numWinners).fill(''));
    }, [numWinners]);

    const handleWinnerChange = (index, value) => {
        const newWinners = [...winners];
        newWinners[index] = value;
        setWinners(newWinners);
    };

    const handleSave = () => {
        setPredefinedWinners(winners);
        setShowWinnersAfterTestSpins(showWinnersAfter);
        if (saveToLocalStorage) {
            const dataToStore = {
                winners,
                showWinnersAfter,
                timestamp: new Date().getTime(),
            };
            localStorage.setItem(LOCAL_STORAGE_KEY_ADMIN, JSON.stringify(dataToStore));
        }
        onClose(); // Llamar a la función de cierre
        navigate('/roulette'); // Redirigir a la ruta /roulette después de guardar
    };

    const handleClear = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ADMIN);
        setStoredWinners([]);
        setWinners(Array(numWinners).fill(''));
        setShowWinnersAfter(0);
    };

    return (
        <div className="fixed bottom-0 right-0 m-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto max-h-56 md:max-h-96 z-10">
            <h2 className="text-lg font-semibold mb-2">{intl.formatMessage({ id: 'admin_panel' })}</h2>
            {winners.map((winner, index) => (
                <div key={index} className="mb-4">
                    <label className="block text-lg font-semibold mb-2">
                        {intl.formatMessage({ id: 'winner' })} {index + 1}
                    </label>
                    <input
                        type="text"
                        value={winner}
                        onChange={(e) => handleWinnerChange(index, e.target.value)}
                        className="w-64 p-2 text-lg border border-gray-300 rounded-lg"
                    />
                </div>
            ))}
            <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                    {intl.formatMessage({ id: 'show_winners_after_test_spins' })}
                </label>
                <input
                    type="number"
                    value={showWinnersAfter}
                    onChange={(e) => setShowWinnersAfter(parseInt(e.target.value, 10))}
                    className="w-64 p-2 text-lg border border-gray-300 rounded-lg"
                />
            </div>
            <div className="mb-4 flex items-center">
                <input
                    type="checkbox"
                    id="saveToLocalStorage"
                    checked={saveToLocalStorage}
                    onChange={(e) => setSaveToLocalStorage(e.target.checked)}
                    className="mr-2"
                />
                <label htmlFor="saveToLocalStorage" className="text-lg font-semibold">
                    {intl.formatMessage({ id: 'save_to_local_storage' })}
                </label>
            </div>
            {storedWinners.length > 0 && (
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2">
                        {intl.formatMessage({ id: 'stored_winners' })}
                    </label>
                    <div className="w-64 p-2 text-lg border border-gray-300 rounded-lg max-h-20 overflow-y-auto">
                        <ul>
                            {storedWinners.map((winner, index) => (
                                <li key={index} className="text-md">
                                    {intl.formatMessage({ id: 'winner' })} {index + 1}: {winner}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <div className="flex justify-between">
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
                >
                    {intl.formatMessage({ id: 'save_winners' })}
                </button>
                <button
                    onClick={handleClear}
                    className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600"
                >
                    {intl.formatMessage({ id: 'clear_data' })}
                </button>
            </div>
        </div>
    );
};

export default FloatingPanel;