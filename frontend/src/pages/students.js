import React, { useEffect, useState } from 'react';
import StudentCard from '../components/studentsCard'; 
import { useNavigate } from 'react-router-dom';
import studentService from '../services/http/student';


const Students = () => {
  const [studentData, setStudentData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
       
        const response = await studentService.getStudents(); 
        localStorage.setItem('studentData', JSON.stringify(response.students));
        setStudentData(response.students);
      } catch (error) {
        console.error('Error fetching Students:', error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    console.log("Updated studentData:", studentData);
  }, [studentData]);

  const handleStudentDetailClick = (studentItem) => {
    localStorage.removeItem('studentItem');
    localStorage.setItem('studentItem', JSON.stringify(studentItem)); 
    navigate('/student-detail'); 
    console.log('Student detail button clicked for:', studentItem);
  };
  
  const handleAddStudent = () => {
    navigate('/add-student'); 
  };

  return (
    <div className="relative mt-32 w-full">
    <h6 className="text-center mb-4 font-bold text-xl">Students</h6>
          
          <button 
            className="absolute top-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            onClick={handleAddStudent}
          >
            Add Student
          </button>
          
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            
          {studentData.map((studentItem, index) => (
              <StudentCard 
                key={index} 
                name={studentItem.name} 
                DOB={studentItem.DOB} 
                feesPaid={studentItem.feesPaid} 
                onStudentDetailClick={() => handleStudentDetailClick(studentItem)}
              />
          ))}
          </div>
        </div>
    
  );
};



export default Students;
