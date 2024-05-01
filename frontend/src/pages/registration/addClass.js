import React, { useState } from 'react';
import classService from '../../services/http/class';
import { useNavigate } from 'react-router-dom';

const AddClass = () => {
    const [classDetails, setClassDetails] = useState({
        className: '',
        year: '',
        studentFees: '',
        
      });
      const navigate=useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setClassDetails({ ...classDetails, [name]: value });
      };

    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const { className, year, studentFees } = classDetails;
    
        if (!className || !year || !studentFees) {
          alert('Class Name, Year, and Fees are mandatory!');
          return;
        }
    
        
        console.log('Submitted Class Details:', classDetails);
        const response = await classService.registerClass({ className, year, studentFees });

        
        console.log("Response from registration:", response);
        navigate('/classes')
      };
    
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Register Class</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-black">
        <table className="min-w-full">
          <tbody>
            <tr>
              <td className="px-4 py-2">
                <label htmlFor="className" className="block text-sm font-medium text-gray-700">Class Name (Required):</label>
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="className"
                  id="className"
                  value={classDetails.className}
                  onChange={handleChange}
                  required
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border border-black"
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year (Required):</label>
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  name="year"
                  id="year"
                  value={classDetails.year}
                  onChange={handleChange}
                  required
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border border-black"
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <label htmlFor="studentFees" className="block text-sm font-medium text-gray-700">Fees (Required):</label>
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  name="studentFees"
                  id="studentFees"
                  value={classDetails.studentFees}
                  onChange={handleChange}
                  required
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border border-black"
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2" className="text-center py-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddClass;
