import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

export const Roulette = () => {
    const [textareaValue, setTextareaValue] = useState('');
    const [prizes, setPrizes] = useState([]);
    const [mustSpin, setMustSpin] = useState(false);
    const [winnerIndex, setWinnerIndex] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [winners, setWinners] = useState([]);
    const [numWinners, setNumWinners] = useState(1);

    const vibrantRainbowColors = [
        '#FF6F61', '#FFB347', '#FFFF66', '#66FF66', '#66FFFF', '#66B2FF', '#B266FF',
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
                    backgroundColor:
                        vibrantRainbowColors[index % vibrantRainbowColors.length],
                    textColor: '#000000',
                },
            }))
        );
        setWinners([]); // Reset winners if the list changes
    };

    const handleNumWinnersChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0 && value <= prizes.length) {
            setNumWinners(value);
        } else if (value > prizes.length) {
            setMessage(`Number of winners cannot exceed ${prizes.length}`);
            setMessageType('error');
        }
    };

    const spinWheel = () => {
        if (prizes.length > 0 && winners.length < numWinners) {
            const winner = Math.floor(Math.random() * prizes.length);
            setWinnerIndex(winner);
            setMustSpin(true);
            setMessage('');
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

        // Add winner to the list of winners
        setWinners((prev) => [...prev, winner.option]);

        // Remove the winner from the prizes list and update the textarea
        const updatedPrizes = prizes.filter((_, index) => index !== winnerIndex);
        setPrizes(updatedPrizes);
        setTextareaValue(updatedPrizes.map((prize) => prize.option).join('\n'));

        // Show success message
        setMessage(`Winner ${winners.length + 1}: ${winner.option}`);
        setMessageType('success');
    };

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
                        className="w-2/3 p-3 text-lg border border-gray-300 rounded-lg mb-4"
                    />
                    <input
                        type="number"
                        value={numWinners}
                        onChange={handleNumWinnersChange}
                        placeholder="Number of winners"
                        className="w-2/3 p-2 text-lg border border-gray-300 rounded-lg mb-6"
                        min="1"
                        max={prizes.length || 1}
                    />
                    <button
                        onClick={spinWheel}
                        className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-600 mb-6"
                    >
                        Spin the Wheel
                    </button>
                    <div className="h-8 mt-4">
                        {message && (
                            <span
                                className={`p-3 text-xl rounded-lg font-semibold ${messageType === 'success'
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                    }`}
                            >
                                {message}
                            </span>
                        )}
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
                                outerBorderWidth={10}
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

            {winners.length > 0 && (
                <div className="mt-6 w-2/3 text-lg">
                    <h2 className="text-xl font-bold mb-2">Winners:</h2>
                    <ul className="list-disc pl-6">
                        {winners.map((winner, index) => (
                            <li key={index}>{`Winner ${index + 1}: ${winner}`}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
