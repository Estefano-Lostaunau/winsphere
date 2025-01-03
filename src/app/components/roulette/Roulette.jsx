import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

export const Roulette = () => {
    const [textareaValue, setTextareaValue] = useState('');
    const [prizes, setPrizes] = useState([]);
    const [mustSpin, setMustSpin] = useState(false);
    const [winnerIndex, setWinnerIndex] = useState(null);

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
    };

    const spinWheel = () => {
        if (prizes.length > 1) {
            const winner = Math.floor(Math.random() * prizes.length);
            setWinnerIndex(winner);
            setMustSpin(true);
        } else {
            alert('Add at least two names to spin the wheel');
        }
    };

    const handleStopSpinning = () => {
        setMustSpin(false);
        alert(`The winner is: ${prizes[winnerIndex].option}!`);
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
                        className="w-2/3 p-3 text-lg border border-gray-300 rounded-lg mb-6"
                    />
                    <button
                        onClick={spinWheel}
                        className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-600 mb-6"
                    >
                        Spin the Wheel
                    </button>
                </div>

                <div className="flex justify-center items-center w-full">
                    <div className="flex justify-center items-center max-w-[445px] aspect-square rounded-full shadow-xl">
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
        </div>
    );
};