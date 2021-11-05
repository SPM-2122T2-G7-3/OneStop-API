
describe("Get User Eligible Courses", function() {
    const username = "lance.fu";
    
    before(function(done) {
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
                userId = doc.id;
            });
        
        const courseCode = "HP101";
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
    
    it("should return status 200 when successfully inserted into DB", function(done){
        CourseController.getUserEligibleCourses(username, (status, payload) => {
            try {
                expect(status).to.be.a("number");
                expect(status).to.equal(200);
                done();
            } catch (error) {
                done(error);
            }
        });
    });
    
    it("should return payload with success status, document ID and message when successfully inserted into DB", function(done){
        CourseController.getUserEligibleCourses(username, (status, payload) => {
            try {
                expect(payload).to.be.an("object");
                expect(payload.eligibleCourses).to.be.a("array");
                done();
            } catch (error) {
                done(error);
            }
        });
    });
    
    after(function(done){
        mongoose.connection.db.dropDatabase(done);
    });
});