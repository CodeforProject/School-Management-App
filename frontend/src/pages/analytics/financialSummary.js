import React, { useEffect, useState } from 'react';
import studentService from '../../services/http/student';
import teacherService from '../../services/http/teacher';


const FinancialSummary = () => {
  const [totalFees, setTotalFees] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const fees = await studentService.getStudentSalary();
        const salary = await teacherService.getTeacherSalary();
        console.log("f1",fees)
        
        setTotalFees(fees.totalFeesPaid);
        setTotalSalary(salary.totalSalary);
      } catch (err) {
        console.error("Error fetching financial data:", err.message || err);
        setError('Failed to fetch financial data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading financial summary...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-8 m-4 w-full max-w-lg text-center">
      <h2 className="text-2xl font-bold mb-6">Financial Summary</h2>
      <p className="text-gray-800 text-lg mb-4">Total Fees Collected from Students: <span className="font-semibold">₹{totalFees}</span></p>
      <p className="text-gray-800 text-lg">Total Salary Paid to Teachers: <span className="font-semibold">₹{totalSalary}</span></p>
    </div>
  </div>
  
  );
};

export default FinancialSummary;
