import React, { useEffect, useState } from 'react';
import Card from '../components/classCard';
import classService from '../services/http/class';

import { useNavigate } from 'react-router-dom';

const Class = () => {
  const [classData, setClassData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await classService.getClass();
        localStorage.setItem('classData', JSON.stringify(response.classes));
        setClassData(response.classes);
      } catch (error) {
        console.error('Error fetching Class:', error);
      }
    };

    fetchClass();
  }, []);

  useEffect(() => {
    console.log("Updated classData:", classData);
  }, [classData]);

  const handleClassDetailClick = (classItem) => {
    localStorage.removeItem('classItem');
    localStorage.setItem('classItem', JSON.stringify(classItem));
    navigate('/class-detail');
    console.log('Class detail button clicked for:', classItem);
  };
  
  const handleAddClass = () => {
    navigate('/add-class'); 
  };

  return (
    <div className="relative mt-32 w-full">
<h6 className="text-center mb-4 font-bold text-xl">Classes</h6>
      
      <button 
        className="absolute top-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        onClick={handleAddClass}
      >
        Add Class
      </button>
      
      <div className="flex flex-wrap justify-center gap-4 pt-8">
        {classData.map((classItem, index) => (
            <Card 
            key={index} 
            className={classItem.className} 
            year={classItem.year} 
            studentFees={classItem.studentFees} 
            onClassDetailClick={() => handleClassDetailClick(classItem)}
          />
        ))}
      </div>
    </div>
  );
};

export default Class;
