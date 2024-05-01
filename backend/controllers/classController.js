const express = require('express');
const Class = require('../models/classSchema');
const Teacher = require('../models/teacherSchema');
const Student=require('../models/studentSchema')

const router = express.Router();

const registerClass = async (req, res) => {
    try {
        const { className, year, studentFees } = req.body;

        const newClass = new Class({
            className,
            year,
            studentFees
        });

       
        const savedClass = await newClass.save();

        res.status(201).json(savedClass);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const getAllStudentsInClass = async (req, res) => {
    try {
     
        console.log("Query Parameters:", req.query);
        const { className } = req.query;
        console.log("className:", className);
        
        
        const foundClass = await Class.findOne({ className });

        
        if (!foundClass) {
            return res.status(404).json({ error: 'Class not found', message: 'The specified class does not exist' });
        }

        
        const studentIds = foundClass.studentList;

        const students = await Student.find({ _id: { $in: studentIds } });


        const studentDetails = students.map(student => ({
            name: student.name,
            gender: student.gender,
            contact: student.contact,
            DOB: student.DOB,
            feesPaid: student.feesPaid



        }));


        res.status(200).json(studentDetails);
    } catch (error) {
       
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getAllClasses = async (req, res) => {
    try {
      
        const allClasses = await Class.find();
        console.log("class",allClasses)

        res.status(200).json({ classes: allClasses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteClass = async (req, res) => {
    try {
        const classId = req.body.classId;
        const deletedClass = await Class.findById(classId);

        if (!deletedClass) {
            return res.status(404).json({ error: 'Class not found', message: 'The specified class does not exist' });
        }

        await Student.updateMany({ className: deletedClass._id }, { $set: { className: null } });
        await Teacher.updateMany({ className: deletedClass._id }, { $set: { className: null } });

        await Class.findByIdAndDelete(classId);

        res.status(200).json(deletedClass);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const updateClassDetails = async (req, res) => {
    try {
        const { classId } = req.body; 
        const updates = {}; 
        const updatableFields = ['className', 'year', 'studentFees']; 

       t
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) { 
                updates[field] = req.body[field];
            }
        });

        if (Object.keys(updates).length === 0) {
           
            return res.status(400).json({ error: 'No valid fields provided for update' });
        }

       
        const updatedClass = await Class.findByIdAndUpdate(classId, updates, { new: true });

        if (!updatedClass) {
            return res.status(404).json({ error: 'Class not found', message: 'The specified class does not exist' });
        }

      
        res.status(200).json({ message: 'Class updated successfully', class: updatedClass });

    } catch (error) {
        console.error("Error updating class details:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};



module.exports = { registerClass, getAllStudentsInClass,deleteClass,getAllClasses,updateClassDetails };