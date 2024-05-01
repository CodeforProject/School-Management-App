import React from 'react';

const TeacherCard = ({ name, DOB, salary, onTeacherDetailClick }) => {
    console.log("name",name)
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-200">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">DOB: {DOB}</p>
        <p className="text-gray-700 text-base">Salary: {salary}</p>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={onTeacherDetailClick}
        >
          Teacher Details
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;
