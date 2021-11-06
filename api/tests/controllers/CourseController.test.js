require('dotenv').config();
const mongoose = require('mongoose');
const expect = require('chai').expect;

const CourseController = require('../../controllers/CourseController');
const Course = require('../../models/CourseModel');

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


describe('Create New Course', function () {
    describe('Valid data for course creation', function () {
        const courseCode = 'HP101';
        const courseTitle = 'HP Printer Basic Training'
        const preReq = [];

        it('should return status 200 when successfully inserted into DB', function (done) {

            CourseController.createCourse(courseCode, courseTitle, preReq, (status, payload) => {
                try {
                    expect(status).to.be.a("number");
                    expect(status).to.equal(200);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });


        it("Should return payload with success status, document ID and message when successfully inserted into DB", function (done) {
            CourseController.createCourse(courseCode, courseTitle, preReq, (status, payload) => {
                try {
                    expect(payload).to.be.an("object");

                    expect(payload.isSuccess).to.be.a("boolean");
                    expect(payload.isSuccess).to.equal(true);

                    expect(payload.documentId).to.be.a("object");
                    expect(payload.message).to.be.a.a("string");

                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
    });
});


describe("Update Course Information", function () {
    const courseCode = "HP101";
    let courseId = undefined;

    beforeEach(function (done) {
        const courseTitle = "HP Foundation Repair Course";
        const preReq = [];

        const courseDetails = {
            courseCode: courseCode,
            courseTitle: courseTitle,
            preReq: preReq
        }

        const newCourse = new Course(courseDetails);
        newCourse.save()
            .then(doc => {
                courseId = doc.id;
                done();
            });
    });

    describe('Valid search of classes by course code', function () {
        const newCourseCode = "HP110";
        const courseTitle = "HP Printer Foundation Repair Course";

        it('should return status 200 when successfully returned', function (done) {

            CourseController.updateCourseInfo(courseCode, newCourseCode, courseTitle, (status, payload) => {
                try {
                    expect(status).to.be.a("number");
                    expect(status).to.equal(200);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });


        it('should return payload when successfully returned', function (done) {
            CourseController.updateCourseInfo(courseCode, newCourseCode, courseTitle, (status, payload) => {
                try {
                    expect(payload).to.be.an("object");
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
    });

    afterEach(function (done) {
        mongoose.connection.db.dropDatabase(done);
    });
});