require('dotenv').config();
const mongoose = require('mongoose');
const expect = require('chai').expect;

const CourseService = require('../../services/CourseService');
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


describe('getClassByCourse Function', function () {
    describe('Valid getClassByCourse Function', function () {
        const courseCode = "P01";

        beforeEach(function (done) {
            const startDate = new Date("2021-10-12");
            const endDate = new Date("2021-11-12");
            const capacity = 50;

            const newCourse = new Course({
                courseCode: "P01",
                courseTitle: "Xerox WorkCentre 5300 User Training",
                _id: mongoose.Types.ObjectId()
            });

            let courseId = newCourse.id;
            newCourse.save();


            const newClass = new ClassRun({
                course: courseId,
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
                chapters: []
            });

            newClass.save()
                .then(doc => {
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done(err);
                });
        });


        it('should return "true" in success when successfully retrived from DB', async function () {
            const { success, result } = await CourseService.getClassesByCourse(courseCode);
            expect(success).to.be.a("boolean");
            expect(success).to.equal(true);
        });


        it('should return correct payload when successfully retrived from DB', async function () {
            const { success, result } = await CourseService.getClassesByCourse(courseCode);
            expect(result).to.be.a("object");

            expect(result.classes).to.be.an("array");
        });
    });
});