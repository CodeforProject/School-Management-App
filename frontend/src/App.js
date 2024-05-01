
import './App.css';
import SideNav from './components/sideNav';

import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Class from './pages/class';
import ClassDetailCard from './components/classDetailCard';
import StudentList from './components/studentList';
import AddClass from './pages/registration/addClass';
import Students from './pages/students';
import StudentDetailCard from './components/studentDetailCard';
import AddStudent from './pages/registration/addStudent';
import Teachers from './pages/teacher';
import TeacherDetailCard from './components/teacherDeailCard';
import AddTeacher from './pages/registration/addTeacher';
import FinancialSummary from './pages/analytics/financialSummary';



function App() {
  return (
    <div className="App">
      <Router>
          <SideNav/>
          <Routes>
          <Route path="/classes" element={<Class/>} />
          <Route path="/class-detail" element={<ClassDetailCard/>} />
          <Route path="/student-list" element={<StudentList/>} />
          <Route path="/add-class" element={<AddClass/>} />
          <Route path="/student" element={<Students/>} />
          <Route path="/student-detail" element={<StudentDetailCard/>} />
          <Route path="/add-student" element={<AddStudent/>} />
          <Route path="/teacher" element={<Teachers/>} />
          <Route path="/teacher-detail" element={<TeacherDetailCard/>} />
          <Route path="/add-teacher" element={<AddTeacher/>} />
          <Route path="/analytics" element={<FinancialSummary/>} />
        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
