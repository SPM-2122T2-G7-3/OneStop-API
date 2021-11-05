require('dotenv').config();
const mongoose = require('mongoose');
const expect = require('chai').expect;

const UserController = require('../../controllers/UserController');
const User = require('../../models/UserModel');


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


describe('User login', function () {
    let userId = undefined;
    const username = "lance.fu";

    before(function (done) {
        const newUser = new User({
            empName: "Lance Fu Dai Fa",
            username: username,
            designation: "Senior Engineer",
            department: "Operations - Repair",
            role: "trainer",
            completedCourse: []
        });

        newUser.save()
            .then(doc => {
                userId = doc.id;
                done()
            });
    });


    it('should return status 200 when successfully retrieved from DB', async function () {
        UserController.login(username, (status, payload) => {
            try {
                expect(status).to.be.a("number");
                expect(status).to.equal(200);
                done();
            } catch (error) {
                done(error);
            }
        });
    });


    it('should return correct payload when successfully retrieved from DB', async function () {
        UserController.login(username, (status, payload) => {
            try {
                expect(payload).to.be.an("object");

                expect(payload.username).to.be.a("string");
                expect(payload.username).to.equal("lance.fu");

                expect(payload.role).to.be.a("string");
                expect(payload.role).to.equal("trainer");
                done();
            } catch (error) {
                done(error);
            }
        });

    });
});


describe('Find User With Role', function () {
    describe('Valid Find User With Role', function () {
        const username = "lance.fu";

        beforeEach(function (done) {
            const newUser = new User({
                empName: "Lance Fu Dai Fa",
                username: username,
                designation: "Senior Engineer",
                department: "Operations - Repair",
                role: "Learner",
                completedCourse: []
            });

            newUser.save()
                .then(doc => {
                    done()
                });
        });

        it('should return status 200 when successfully found', function () {
            const role = "admin";

            UserController.findUserWRole(role, (status, payload) => {
                try {
                    expect(status).to.be.a("number");
                    expect(status).to.equal(200);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });


        it('should return payload when successfully found', function () {
            const role = "admin";

            UserController.findUserWRole(role, (status, payload) => {
                try {
                    expect(payload.users).to.be.an("object");
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });


        afterEach(function (done) {
            User.deleteMany({}, function (err) {
                if (err) {
                    console.log(err);
                }
                done();
            });
        });
    });


    describe('Invalid Find User With Role', function () {
        const username = "lance.fu";

        beforeEach(function (done) {
            const newUser = new User({
                empName: "Lance Fu Dai Fa",
                username: username,
                designation: "Senior Engineer",
                department: "Operations - Repair",
                role: "Learner",
                completedCourse: []
            });

            newUser.save()
                .then(doc => {
                    done()
                });
        });

        it('should return status 400 if not successfully found', function () {
            const role = "";
            UserController.findUserWRole(role, (status, payload) => {
                try {
                    expect(status).to.be.a("number");
                    expect(status).to.equal(400);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });


        it('should return error with error message', function () {
            const role = "";

            UserController.findUserWRole(role, (status, payload) => {
                try {
                    expect(payload).to.be.an("object");
                    expect(payload.errors).to.be.a("string");
                    expect(payload.users).to.be.an("object");
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });


        afterEach(function (done) {
            User.deleteMany({}, function (err) {
                if (err) {
                    console.log(err);
                }
                done();
            });
        });
    });
});


describe('Update User with Role', function () {
    const username = "lance.fu";

    beforeEach(function (done) {
        const newUser = new User({
            empName: "Lance Fu Dai Fa",
            username: username,
            designation: "Senior Engineer",
            department: "Operations - Repair",
            role: "Learner",
            completedCourse: []
        });

        newUser.save()
            .then(doc => {
                done()
            });
    });

    it('should return status 200 when successfully updated', function () {
        const role = "Trainer";
        UserController.updateUserWRole(username, role, (status, payload) => {
            try {
                expect(status).to.be.a("number");
                expect(status).to.equal(200);
                done();
            } catch (error) {
                done(error);
            }
        });
    });


    it('should return payload when successfully updated', function () {
        const role = "Trainer";
        UserController.updateUserWRole(username, role, (status, payload) => {
            try {
                expect(payload).to.be.an("object");
                expect(payload.message).to.be.a("string");
                done();
            } catch (error) {
                done(error);
            }
        });
    });


    afterEach(function (done) {
        User.deleteMany({}, function (err) {
            if (err) {
                console.log(err);
            }
            done();
        });
    });
});