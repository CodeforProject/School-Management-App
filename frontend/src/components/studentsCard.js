import React from 'react';

const StudentCard = ({ name, DOB, feesPaid, onStudentDetailClick }) => {
    
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-200">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">DOB: {DOB}</p>
        <p className="text-gray-700 text-base">Fees: {feesPaid}</p>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={onStudentDetailClick}
        >
          Student Details
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
