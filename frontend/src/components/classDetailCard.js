import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';
import classService from '../services/http/class';
import { useNavigate } from 'react-router-dom';


const ClassDetailCard = () => {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [classData, setClassData] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const classData = getClassDataFromLocalStorage();
        setClassData(classData);

        const response = await classService.getStudent();
        console.log("response",response)
        const students  = response;
        console.log("students",students)
        
        let male = 0;
        let female = 0;

        students.forEach(student => {
          const gender = student.gender.toLowerCase(); 
          if (gender === 'male') {
            male++;
          } else if (gender === 'female') {
            female++;
          }
        });

        setMaleCount(male);
        setFemaleCount(female);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  const handleStudentListClick = () => {

    navigate('/student-list')
  };

  const handleDeleteClass = async () => {
   
    const isConfirmed = window.confirm("Are you sure you want to delete this class?");

    if (isConfirmed) {
        try {
            console.log("id",classData._id)
            await classService.deleteClass(classData._id);

            console.log('Class deleted successfully');
            navigate('/classes');
        } catch (error) {
            console.error('Error deleting class:', error);
        
        }
    } else {
        
        console.log('Class deletion was cancelled.');
    }
}


  const getClassDataFromLocalStorage = () => {
    const classData = localStorage.getItem('classItem');
    return classData ? JSON.parse(classData) : {};
  };

  const genderData = [
    { name: 'Male', count: maleCount },
    { name: 'Female', count: femaleCount },
  ];

  return (
    <div className="flex justify-center items-center flex-col h-screen">
        <div className="self-end pr-8 pt-4">
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteClass}
        >
          Delete Class
        </button>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-200 mb-8">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{classData.className}</div>
          <p className="text-gray-700 text-base">Year: {classData.year}</p>
          <p className="text-gray-700 text-base">Fees: {classData.studentFees}</p>
          <p className="text-gray-700 text-base">Male Students: {maleCount}</p>
          <p className="text-gray-700 text-base">Female Students: {femaleCount}</p>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleStudentListClick}
          >
            Student List
          </button>
        </div>
      </div>

     
      <div className="chart-container" style={{ width: '100%', maxWidth: '500px' }}>
        <BarChart
          width={500}
          height={300}
          data={genderData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" barSize={20} />
        </BarChart>
      </div>
    </div>
  );
};

export default ClassDetailCard;
