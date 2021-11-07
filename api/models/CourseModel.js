const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        unique: true
    },
    courseTitle: String,
    preReq: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});


module.exports = mongoose.model("Course", courseSchema);