const Class = require('../models/classSchema');
const Student = require('../models/studentSchema');

const registerStudent = async (req, res) => {
    try {
        const { name, contact, gender, className, DOB, feesPaid } = req.body;

        const existingClass = await Class.findOne({ className });

        if (!existingClass) {
            return res.status(400).json({ error: 'Invalid className', message: 'The specified class does not exist' });
        }
        console.log("e1",existingClass)

        const newStudent = new Student({
            name,
            contact,
            gender,
            className: existingClass._id,
            DOB,
            feesPaid
        });

        const savedStudent = await newStudent.save();

        
        existingClass.studentList.push(savedStudent._id);
        await existingClass.save();


        res.status(201).json(savedStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getTotalFeesPaid = async (req, res) => {
    try {
    
        const allStudents = await Student.find();

        const totalFeesPaid = allStudents.reduce((acc, student) => acc + student.feesPaid, 0);

        res.status(200).json({ totalFeesPaid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getAllStudents = async (req, res) => {
    try {
      
        const allStudents = await Student.find();
        console.log("student",allStudents)

        res.status(200).json({ students: allStudents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.body.studentId;
        const deletedStudent = await Student.findById(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found', message: 'The specified student does not exist' });
        }

        await Student.findByIdAndDelete(studentId);

        res.status(200).json({ message: 'Student deleted successfully', deletedStudent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updateStudentDetails = async (req, res) => {
    try {
        const { studentId } = req.body; 
        const updates = {}; 
        const updatableFields = ['name', 'DOB', 'contact', 'className'];
       
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        if (Object.keys(updates).length === 0) {
          
            return res.status(400).json({ error: 'No valid fields provided for update' });
        }

        const updatedStudent = await Student.findByIdAndUpdate(studentId, updates, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found', message: 'The specified student does not exist' });
        }

    
        res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });

    } catch (error) {
        console.error("Error updating student details:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};




module.exports = {registerStudent,getTotalFeesPaid,getAllStudents,deleteStudent,updateStudentDetails};
