/* eslint-disable react/prop-types */
const ALPHABETS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const WordFilter = ({ setFilter }) => {
    return (
        <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                    {ALPHABETS.map(letter => (
                        <button
                            key={letter}
                            onClick={() => setFilter(letter)}
                            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center 
                                     rounded-lg text-lg font-medium
                                     text-gray-600 hover:text-indigo-600
                                     hover:bg-indigo-50
                                     transform hover:scale-110
                                     transition-all duration-200 ease-in-out
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WordFilter;