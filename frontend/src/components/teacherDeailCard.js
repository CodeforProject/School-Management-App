import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import teacherService from '../services/http/teacher';





const TeacherDetailCard = () => {
 
  const [teacherData, setTeacherData] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const teacherData = getClassDataFromLocalStorage();
        setTeacherData(teacherData);

       
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    fetchTeacherData();
  }, []);

  

  const handleDeleteTeacher = async () => {
    
    const isConfirmed = window.confirm("Are you sure you want to delete this Teacher?");

    if (isConfirmed) {
        try {
            console.log("id",teacherData._id)
            await teacherService.deleteTeacher(teacherData._id);

            console.log('Teacher deleted successfully');
            navigate('/teacher');
        } catch (error) {
            console.error('Error deleting teacher:', error);
        
        }
    } else {
        
        console.log('Teacher deletion was cancelled.');
    }
}


  const getClassDataFromLocalStorage = () => {
    const teacherData = localStorage.getItem('teacherItem');
    return teacherData ? JSON.parse(teacherData) : {};
  };

  

  return (
    <div className="flex justify-center items-center flex-col h-screen">
        <div className="self-end pr-8 pt-4">
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteTeacher}
        >
          Delete Teacher
        </button>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-200 mb-8">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{teacherData.name}</div>
          <p className="text-gray-700 text-base">DOB: {teacherData.DOB}</p>
          <p className="text-gray-700 text-base">Salary: {teacherData.salary}</p>
          <p className="text-gray-700 text-base">Gender: {teacherData.gender}</p>
         
          
        </div>
      </div>

     
     
    </div>
  );
};

export default TeacherDetailCard;
