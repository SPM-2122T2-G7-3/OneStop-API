require('dotenv').config();
const mongoose = require('mongoose');
const expect = require('chai').expect;


const ClassService = require('../../services/ClassService');
const Course = require('../../models/CourseModel');
const ClassRun = require('../../models/ClassModel');


before(function (done) {
    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbName = process.env.DB_TEST_NAME;
    const connStr = `mongodb://${dbHost}:${dbPort}/${dbName}`;
    mongoose.connect(connStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, done);
});


describe('getClassInfo Function', function () {
    let classId = undefined;

    before(function (done) {
        const startDate = new Date("2021-10-12");
        const endDate = new Date("2021-11-12");
        const capacity = 50;

        const courseDetails = new Course({
            courseCode: "P01",
            courseTitle: "Xerox WorkCentre 5300 User Training",
            _id: mongoose.Types.ObjectId()
        });
        
        courseDetails.save();

        const newClass = new ClassRun({
            course: courseDetails._id,
            startDate: startDate,
            endDate: endDate,
            capacity: capacity,
            trainers: ["lance.fu"],
            learners: [{
                username: "shermin.lim",
                enrolled: true
            },
            {
                username: "siti.hindun",
                enrolled: true
            }],
            content: []
        });

        newClass.save()
            .then(doc => {
                classId = doc.id;
                done()
            });
    });


    it('should return "true" in success when successfully retrived from DB', async function () {
        const {success, result} = await ClassService.getClassInfo(classId);
        expect(success).to.be.a("boolean");
        expect(success).to.equal(true);
    });

    
    it('should return correct payload when successfully retrived from DB', async function () {
        const {success, result} = await ClassService.getClassInfo(classId);
        expect(result).to.be.a("object");
        
        expect(result.capacity).to.be.a("number");
        expect(result.capacity).to.equal(50);
        
        expect(result.availableCapacity).to.be.a("number");
        expect(result.availableCapacity).to.equal(48);
    });
});