const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    className: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }
});

module.exports = mongoose.model("Teacher", teacherSchema);
