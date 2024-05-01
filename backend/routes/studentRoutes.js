const express = require('express');
const {registerStudent,getTotalFeesPaid,getAllStudents,deleteStudent,updateStudentDetails} = require('../controllers/studentController');

const router = express.Router();

router.post('/', registerStudent);

router.get('/total-fees',getTotalFeesPaid);

router.get('/student-list',getAllStudents);

router.delete('/delete',deleteStudent);

router.patch('/update-details', updateStudentDetails);



module.exports = router;


