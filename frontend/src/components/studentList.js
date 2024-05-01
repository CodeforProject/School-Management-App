import React, { useEffect, useState } from 'react';
import classService from '../services/http/class';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 7;
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await classService.getStudent();
        setStudents(response);
        setMaxPage(Math.ceil(response.length / entriesPerPage));
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = students.slice(indexOfFirstEntry, indexOfLastEntry);

  const nextPage = () => {
    if (currentPage < maxPage) setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>
      <table className="w-11/12 md:w-3/4 mx-auto border-collapse">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Contact</th>
            <th className="p-2 border border-gray-300">Gender</th>
            <th className="p-2 border border-gray-300">DOB</th>
            <th className="p-2 border border-gray-300">Fees Paid</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((student, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="p-2 text-center">{student.name}</td>
              <td className="p-2 text-center">{student.contact}</td>
              <td className="p-2 text-center">{student.gender}</td>
              <td className="p-2 text-center">{student.DOB}</td>
              <td className="p-2 text-center">{student.feesPaid ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <button 
          onClick={previousPage} 
          disabled={currentPage === 1}
          className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded disabled:bg-blue-300"
        >
          Previous
        </button>
        <button 
          onClick={nextPage} 
          disabled={currentPage >= maxPage}
          className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded disabled:bg-blue-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentList;
