import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import studentService from '../services/http/student';



const StudentDetailCard = () => {
 
  const [studentData, setStudentData] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentData = getClassDataFromLocalStorage();
        setStudentData(studentData);

       
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  

  const handleDeleteClass = async () => {
    
    const isConfirmed = window.confirm("Are you sure you want to delete this class?");

    if (isConfirmed) {
        try {
            console.log("id",studentData._id)
            await studentService.deleteStudent(studentData._id);

            console.log('Class deleted successfully');
            navigate('/student');
        } catch (error) {
            console.error('Error deleting class:', error);
        
        }
    } else {
        
        console.log('Class deletion was cancelled.');
    }
}


  const getClassDataFromLocalStorage = () => {
    const studentData = localStorage.getItem('studentItem');
    return studentData ? JSON.parse(studentData) : {};
  };

  

  return (
    <div className="flex justify-center items-center flex-col h-screen">
        <div className="self-end pr-8 pt-4">
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteClass}
        >
          Delete Student
        </button>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-200 mb-8">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{studentData.name}</div>
          <p className="text-gray-700 text-base">DOB: {studentData.DOB}</p>
          <p className="text-gray-700 text-base">Fees: {studentData.feesPaid}</p>
          <p className="text-gray-700 text-base">Gender: {studentData.gender}</p>
          <p className="text-gray-700 text-base">Contact: {studentData.contact}</p>
          
        </div>
      </div>

     
     
    </div>
  );
};

export default StudentDetailCard;
