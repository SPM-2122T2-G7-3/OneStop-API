require('dotenv').config();
const mongoose = require('mongoose');
const expect = require('chai').expect;

const UserService = require('../../services/UserService');
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


describe('getUser Function', function () {
    let userId = undefined;
    const username = "lance.fu";

    before(function (done) {
        const newUser = new User({
            empName: "Lance Fu Dai Fa",
            username: "lance.fu",
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


    it('should return "true" in success when successfully retrived from DB', async function () {
        const { success, result } = await UserService.getUser(username);
        expect(success).to.be.a("boolean");
        expect(success).to.equal(true);
    });


    it('should return correct payload when successfully retrived from DB', async function () {
        const { success, result } = await UserService.getUser(username);
        expect(result).to.be.a("object");

        expect(result.empName).to.be.a("string");
        expect(result.empName).to.equal("Lance Fu Dai Fa");

        expect(result.designation).to.be.a("string");
        expect(result.designation).to.equal("Senior Engineer");
    });
});