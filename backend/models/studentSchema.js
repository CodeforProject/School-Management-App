const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
    className: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    feesPaid: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Student", studentSchema);
