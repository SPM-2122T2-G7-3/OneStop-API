const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    empName: String,
    username: {
        type: String,
        unique: true
    },
    designation: String,
    department: String,
    role: String,
    completedCourse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});


module.exports = mongoose.model("User", userSchema);