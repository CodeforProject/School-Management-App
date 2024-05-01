const express = require('express');
const {registerClass,getAllStudentsInClass,deleteClass,getAllClasses,updateClassDetails} = require('../controllers/classController');


const router = express.Router();

router.post('/', registerClass);

router.get('/student-list',getAllStudentsInClass)

router.get('/class-list',getAllClasses);

router.delete('/delete',deleteClass)

router.patch('/update-details', updateClassDetails);

module.exports = router;
