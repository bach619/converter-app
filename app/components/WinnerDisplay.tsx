import React, { useEffect, useState } from 'react';

interface WinnerDisplayProps {
  winner: string | null;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (winner) {
      setShowPopup(true);
    }
  }, [winner]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 animate-popup">
        <h2 className="text-3xl font-bold mb-6 text-center">The Winner Is:</h2>
        <div className="text-7xl font-extrabold text-center py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          {winner}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowPopup(false)}
            className="px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerDisplay;
