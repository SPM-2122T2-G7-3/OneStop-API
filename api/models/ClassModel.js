const mongoose = require('mongoose');


const sectionSchema = new mongoose.Schema({
    sectionTitle: String,
    // Use GridFS to store the file. Hence using the ID in GFS to store here as String
    // Then we will create a separate route to stream the file directly
    materials: [ String ]
});


const chapterSchema = new mongoose.Schema({
    chapterTitle: String,
    sections: [ sectionSchema ]
});


const classSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }, 
    startDate: Date,
    endDate: Date,
    capacity: Number,
    trainers: [ String ],
    learners: [{
        username: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }, 
        enrolled: Boolean
    }],
    content: [ chapterSchema ]
});


module.exports = mongoose.model("ClassRun", classSchema);