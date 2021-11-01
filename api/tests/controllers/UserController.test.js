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
            role: "Trainer",
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
                expect(payload.role).to.equal("Trainer");
                done();
            } catch (error) {
                done(error);
            }
        });

    });
});