import React, { useEffect, useState } from 'react';


import { useNavigate } from 'react-router-dom';

import TeacherCard from '../components/teachersCard';
import teacherService from '../services/http/teacher';





const Teachers = () => {
  const [teacherData, seTeacherData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
       
        const response = await teacherService.getTeacher(); 
        localStorage.setItem('teacherData', JSON.stringify(response.teacher));
        seTeacherData(response.teacher);
      } catch (error) {
        console.error('Error fetching Teacher:', error);
      }
    };

    fetchTeacher();
  }, []);

  useEffect(() => {
    console.log("Updated teacherData:", teacherData);
  }, [teacherData]);

  const handleTeacherDetailClick = (teacherItem) => {
    localStorage.removeItem('teacherItem');
    localStorage.setItem('teacherItem', JSON.stringify(teacherItem)); 
    navigate('/teacher-detail'); 
    console.log('Student detail button clicked for:', teacherItem);
  };
  
  const handleAddTeacher = () => {
    navigate('/add-teacher'); 
  };

  return (
    <div className="relative mt-32 w-full">
    <h6 className="text-center mb-4 font-bold text-xl">Teachers</h6>
          
          <button 
            className="absolute top-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            onClick={handleAddTeacher}
          >
            Add Teacher
          </button>
          
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            
          {teacherData.map((teacherItem, index) => (
              <TeacherCard 
                key={index} 
                name={teacherItem.name} 
                DOB={teacherItem.DOB} 
                salary={teacherItem.salary} 
                onTeacherDetailClick={() => handleTeacherDetailClick(teacherItem)}
              />
          ))}
          </div>
        </div>
    
  );
};



export default Teachers;
