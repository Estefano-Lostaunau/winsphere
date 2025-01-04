import React, { useState } from 'react';

const AdminPanel = ({ numWinners, setPredefinedWinners }) => {
    const [winners, setWinners] = useState(Array(numWinners).fill(''));

    const handleWinnerChange = (index, value) => {
        const newWinners = [...winners];
        newWinners[index] = value;
        setWinners(newWinners);
    };

    const handleSave = () => {
        setPredefinedWinners(winners);
    };

    return (
        <div className="flex flex-col items-center my-10">
            <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
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

export default AdminPanel;