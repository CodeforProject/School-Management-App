const express = require('express');

const {registerTeacher,getTotalSalary,getAllTeacher,deleteTeacher,updateTeacherDetails} = require('../controllers/TeacherController');

const router = express.Router();

router.post('/', registerTeacher);
router.get('/total-salary', getTotalSalary);
router.get('/teacher-list', getAllTeacher);
router.delete('/delete', deleteTeacher);
router.patch('/update-details', updateTeacherDetails);

module.exports = router;


