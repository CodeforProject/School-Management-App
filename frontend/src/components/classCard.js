import React from 'react';

const Card = ({ className,year,studentFees,onClassDetailClick }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-200">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{className}</div>
        <p className="text-gray-700 text-base">Year: {year}</p>
        <p className="text-gray-700 text-base">Fees: {studentFees}</p>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={onClassDetailClick}
        >
          Class Details
        </button>
      </div>
    </div>
  );
};

export default Card;
