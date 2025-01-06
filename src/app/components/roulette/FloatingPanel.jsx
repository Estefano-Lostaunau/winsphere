import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

const FloatingPanel = ({ numWinners, setPredefinedWinners, onClose, setShowWinnersAfterTestSpins }) => {
    const [winners, setWinners] = useState(Array(numWinners).fill(''));
    const [showWinnersAfter, setShowWinnersAfter] = useState(0);
    const navigate = useNavigate();
    const intl = useIntl();

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
        onClose(); // Llamar a la función de cierre
        navigate('/roulette'); // Redirigir a la ruta /roulette después de guardar
    };

    return (
        <div className="fixed bottom-0 right-0 m-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto max-h-56 md:max-h-96">
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
            <button
                onClick={handleSave}
                className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
            >
                {intl.formatMessage({ id: 'save_winners' })}
            </button>
        </div>
    );
};

export default FloatingPanel;