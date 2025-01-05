import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingPanel = ({ numWinners, setPredefinedWinners }) => {
    const [winners, setWinners] = useState(Array(numWinners).fill(''));
    const navigate = useNavigate();

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
        navigate('/roulette'); // Redirigir a la ruta /roulette después de guardar
    };

    return (
        <div className="fixed bottom-0 right-0 m-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto max-h-56 md:max-h-96">
            <h2 className="text-lg font-semibold mb-2">Admin Panel</h2>
                {winners.map((winner, index) => (
                <div key={index} className="mb-4">
                    <label className="block text-lg font-semibold mb-2">
                        Winner {index + 1}
                    </label>
                    <input
                        type="text"
                        value={winner}
                        onChange={(e) => handleWinnerChange(index, e.target.value)}
                        className="w-64 p-2 text-lg border border-gray-300 rounded-lg"
                    />
                </div>
            ))}
            <button
                onClick={handleSave}
                className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
            >
                Save Winners
            </button>
        </div>
    );
};

export default FloatingPanel;