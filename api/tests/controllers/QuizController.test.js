require('dotenv').config();
const mongoose = require('mongoose');
const expect = require('chai').expect;

const QuizController = require('../../controllers/QuizController');
const Quiz = require('../../models/QuizModel')
const QuizAttempt = require('../../models/QuizAttemptModel')


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


describe("Create Quiz", function () {
    describe("True/False Question", function () {
        describe("Valid Data", function () {
            const courseCode = "HP101";
            const section = 1;
            const quizName = "Printer Functions";
            const timeAllowed = 3600;
            const quizJSON = {
                "quizName": quizName,
                "timeAllowed": timeAllowed,
                "questions": [{
                    "questionText": "HP OfficeJet Pro 7740 can accept A3 size paper",
                    "questionType": "TF",
                    "answerOptions": ["True", "False"],
                    "correctAnswers": ["True"]
                }]
            };


            it("Should return status 200 when successfully inserted into DB", function (done) {
                QuizController.createQuizBySection(courseCode, section, quizJSON, (status, payload) => {
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
                QuizController.createQuizBySection(courseCode, section, quizJSON, (status, payload) => {
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
        }); // Valid Data

        describe("Invalid Data", function () {
            const courseCode = "HP101";
            const section = 1;
            const quizName = "Printer Functions";
            const quizJSON = {
                "quizName": quizName,
                "questions": [{
                    "questionText": "HP OfficeJet Pro 7740 can accept A3 size paper",
                    "questionType": "TF",
                    "answerOptions": ["True", "False"],
                    "correctAnswers": ["Truety"]
                }]
            };


            it("Should return status 400 when called with invalid question(s)", function (done) {
                QuizController.createQuizBySection(courseCode, section, quizJSON, (status, payload) => {
                    try {
                        expect(status).to.be.a("number");
                        expect(status).to.equal(400);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
            });


            it("Should return error with error message when called with invalid question(s)", function (done) {
                QuizController.createQuizBySection(courseCode, section, quizJSON, (status, payload) => {
                    try {
                        expect(payload).to.be.an("object");
                        expect(payload.errors).to.be.a("string");
                        expect(payload.questions).to.be.a("array");
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
            });
        }); // Invalid Data
    }); // True/False Question

    describe("MCQ Questions", function () {
        describe("Valid Data", function () {
            const courseCode = "HP101";
            const section = 1;
            const quizName = "Printer Functions";
            const timeAllowed = 3600;

            describe("Single Option", function () {
                const quizJSON = {
                    "quizName": quizName,
                    "questions": [{
                        "questionText": "What should you first check if the scanning function is not working?",
                        "questionType": "MCQ",
                        "answerOptions": [
                            "Wireless Network",
                            "Ethernet Network",
                            "USB Connection",
                            "Bluetooth Connection"
                        ],
                        "correctAnswers": [
                            "Wireless Network"
                        ]
                    }]
                };

                it("Should return status 200 when successfully inserted into DB", function (done) {
                    QuizController.createQuizBySection(courseCode, section, quizJSON, (status, payload) => {
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
                    QuizController.createQuizBySection(courseCode, section, quizJSON, (status, payload) => {
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

            describe("Multiple Options", function () {
                const quizJSON = {
                    "quizName": quizName,
                    "timeAllowed": timeAllowed,
                    "questions": [{
                        "questionText": "What should you first check if the scanning function is not working?",
                        "questionType": "MCQ",
                        "answerOptions": [
                            "Wireless Network",
                            "Ethernet Network",
                            "USB Connection",
                            "Bluetooth Connection"
                        ],
                        "correctAnswers": [
                            "Wireless Network",
                            "Ethernet Network"
                        ]
                    }]
                };

                it("Should return status 200 when successfully inserted into DB", function (done) {
                    QuizController.createQuizBySection(courseCode, section, quizJSON, (status, payload) => {
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
                    QuizController.createQuizBySection(courseCode, section, quizJSON, (status, payload) => {
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

            })

        }); // Valid Data


        describe("Invalid Data", function () {
            const courseCode = "HP101";
            const section = 1;
            const quizName = "Printer Functions";
            const quizJSON = {
                "quizName": quizName,
                "questions": [{
                    "questionText": "What should you first check if the scanning function is not working?",
                    "questionType": "MCQ",
                    "answerOptions": [
                        "Wireless Network",
                        "Ethernet Network",
                        "USB Connection",
                    ],
                    "correctAnswers": [
                        "Bluetooth Connection"
                    ]
                }]
            };


            it("Should return status 400 when called with invalid question(s)", function (done) {
                QuizController.createQuizBySection(courseCode, section, quizJSON, (status, payload) => {
                    try {
                        expect(status).to.be.a("number");
                        expect(status).to.equal(400);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
            });


            it("Should return error with error message when called with invalid question(s)", function (done) {
                QuizController.createQuizBySection(courseCode, section, quizJSON, (status, payload) => {
                    try {
                        expect(payload).to.be.an("object");
                        expect(payload.errors).to.be.a("string");
                        expect(payload.questions).to.be.a("array");
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
            });
        }); // Invalid Data
    });

    // Clean up database after testing "Create Quiz"
    after(function (done) {
        mongoose.connection.db.dropDatabase(done);
    });
}); // Create Quiz


describe("Delete Quiz", function () {
    describe("Valid Delete", function () {
        let quizId = undefined;

        beforeEach(function (done) {
            const quizDetails = {
                courseCode: "HP101",
                section: 1,
                quizName: "Printer Functions",
                quizMarks: 1,
                timeAllowed: 3600,
                questions: [{
                    "questionText": "HP OfficeJet Pro 7740 can accept A3 size paper",
                    "questionType": "TF",
                    "answerOptions": ["True", "False"],
                    "correctAnswers": ["True"]
                }]
            };

            const newQuiz = new Quiz(quizDetails);

            newQuiz.save()
                .then(doc => {
                    quizId = doc.id;
                    done();
                });
        });

        it("Should return status 200 when question successfully deleted", function (done) {
            QuizController.deleteQuiz(quizId, (status, payload) => {
                try {
                    expect(status).to.be.a("number");
                    expect(status).to.equal(200);
                    done();
                } catch (error) {
                    done(error);
                }
            })
        })

        it("Should return Delete Quiz Message", function (done) {
            QuizController.deleteQuiz(quizId, (status, payload) => {
                try {
                    expect(payload).to.be.an("object");
                    expect(payload.message).to.be.a("string");
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
    });

    describe("Invalid Delete Quiz", function () {
        let quizId = undefined;

        beforeEach(function (done) {
            const quizDetails = {
                courseCode: "HP101",
                section: 1,
                quizName: "Printer Functions",
                quizMarks: 1,
                timeAllowed: 3600,
                questions: [{
                    "questionText": "HP OfficeJet Pro 7740 can accept A3 size paper",
                    "questionType": "TF",
                    "answerOptions": ["True", "False"],
                    "correctAnswers": ["True"]
                }]
            };

            const newQuiz = new Quiz(quizDetails);

            newQuiz.save()
                .then(doc => {
                    quizId = doc.id;
                    done();
                });
        });

        it("Should return error 400 when not successfully deleted", function (done) {
            quizId = "";

            QuizController.deleteQuiz(quizId, (status, payload) => {
                try {
                    expect(status).to.be.a("number");
                    expect(status).to.equal(400);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });

        it("Should return error with error message", function (done) {
            quizId = "";

            QuizController.deleteQuiz(quizId, (status, payload) => {
                try {
                    expect(payload).to.be.an("object");
                    expect(payload.errors).to.be.a("array");
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
}); // Delete Quiz


describe("Update Quiz Questions", function () {
    describe("Valid Quiz Questions Update", function () {
        let quizId = undefined;

        const quizDetails = {
            courseCode: "HP101",
            section: 1,
            quizName: "Printer Functions",
            quizMarks: 1,
            timeAllowed: 3600,
            questions: [{
                "questionText": "HP OfficeJet Pro 7740 can accept A3 size paper",
                "questionType": "TF",
                "answerOptions": ["True", "False"],
                "correctAnswers": ["True"]
            }]
        };


        before(function (done) {
            const newQuiz = new Quiz(quizDetails);

            newQuiz.save()
                .then(doc => {
                    quizId = doc.id;
                    done();
                });
        });


        it("Should return status 200 when successfully updated", function (done) {
            const questions = [{
                "questionText": "HP OfficeJet Pro 7740 can accept A3 size paper",
                "questionType": "TF",
                "answerOptions": ["True", "False"],
                "correctAnswers": ["False"]
            }];

            QuizController.updateQuizQuestions(quizId, questions, (status, payload) => {
                try {
                  expect(status).to.be.a("number");
                    expect(status).to.equal(200);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
      
      it("Should return Update Quiz Info message", function (done) {
            const questions = [{
                "questionText": "HP OfficeJet Pro 7740 can accept A3 size paper",
                "questionType": "TF",
                "answerOptions": ["True", "False"],
                "correctAnswers": ["False"]
            }];

            QuizController.updateQuizQuestions(quizId, questions, (status, payload) => {
                try {
                  expect(payload.message).to.be.a("string");
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
    });
  
  describe(" Invalid Quiz Questions Update", function () {
        let quizId = undefined;

        const quizDetails = {
            courseCode: "HP101",
            section: 1,
            quizName: "Printer Functions",
            quizMarks: 1,
            timeAllowed: 3600,
            questions: [{
                "questionText": "HP OfficeJet Pro 7740 can accept A3 size paper",
                "questionType": "TF",
                "answerOptions": ["True", "False"],
                "correctAnswers": ["True"]
            }]
        };


        before(function (done) {
            const newQuiz = new Quiz(quizDetails);

            newQuiz.save()
                .then(doc => {
                    quizId = doc.id;
                    done();
                });
        });


        it("Should return Status 400 when Update is not successful", function (done) {
            const questions = [{
                "questionText": "HP OfficeJet Pro 7740 can accept A3 size paper",
                "questionType": "TF",
                "answerOptions": ["True", "False"],
                "correctAnswers": ["Falsey"]
            }];

            QuizController.updateQuizQuestions(quizId, questions, (status, payload) => {
                try {
                    expect(status).to.be.a("number");
                    expect(status).to.equal(400);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });


        it("Should return error with error message", function (done) {
            const questions = [{
                "questionText": "HP OfficeJet Pro 7740 can accept A3 size paper",
                "questionType": "TF",
                "answerOptions": ["True", "False"],
                "correctAnswers": ["Falsey"]
            }];

            QuizController.updateQuizQuestions(quizId, questions, (status, payload) => {
                try {
                    expect(payload).to.be.an("object");
                    expect(payload.errors).to.be.a("string");
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
    
    
    });
});


describe("Mark Quiz" , function (){
    describe("Valid Marking of Quiz", function(){
        let quizId = undefined;
        let originalQuestion = undefined;
    
        beforeEach(function(done){
            const quizDetails = {
                courseCode: "HP101",
                section: 1,
                quizName: "Printer Functions",
                quizMarks: 1,
                timeAllowed: 3600,
                questions:  [{
                    "questionText": "HP OfficeJet Pro 7740 can accept A3 size paper",
                    "questionMarks": 1,
                    "questionType": "TF",
                    "answerOptions": ["True", "False"],
                    "correctAnswers": ["True"]
                }]
            };
    
            const newQuiz = new Quiz(quizDetails);
    
            newQuiz.save()
            .then( doc => {
                quizId = doc.id;
                originalQuestion = doc.questions[0];
                done();
            });
        });


        it("should return status 200 when answer is valid", function(done) {
            const username = "lance.fu";
            const questions = [{
                "questionId": originalQuestion.id,
                "answers": ["True"]
            }];

            QuizController.markQuiz(quizId, questions, username, (status, payload) => {
                try{
                    expect(status).to.be.a("number");
                    expect(status).to.equal(200);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
  
        it('should return Quiz Attempt message', function(done) {
            const username = "lance.fu";
            const questions = [{
                "questionId": originalQuestion.id,
                "answers": ["True"]
            }];


            QuizController.markQuiz(quizId, questions, username, (status, payload) => {
                try{
                    expect(payload).to.be.a("object");
                    expect(payload.message).to.be.a("string");
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
    });

    // afterEach(function(done){
    //     mongoose.connection.db.dropDatabase(done);
    // });
});


describe("Get Quiz Attempts", function(){
    describe("Valid Quiz Attempts", function(){
        let quizAttemptId = undefined;
        let quizId = undefined;
        let questionId = undefined;
        
        beforeEach(function(done){
            const quizDetails = {
                courseCode: "HP101",
                section: 1,
                quizName: "Printer Functions",
                quizMarks: 1,
                timeAllowed: 3600,
                questions:  [{
                    "questionText": "HP OfficeJet Pro 7740 can accept A3 size paper",
                    "questionMarks": 1,
                    "questionType": "TF",
                    "answerOptions": ["True", "False"],
                    "correctAnswers": ["True"]
                }]
            };
    
            const newQuiz = new Quiz(quizDetails);
    
            newQuiz.save()
            .then( doc => {
                quizId = doc.id;
                questionId = doc.questions[0]._id;
            });
            
            
            const quizAttemptDetails = {
                quizId: quizId,
                learner: "lance.fu",
                marksAwarded: 1,
                passed: true,
                questions: [{
                    questionId: questionId,
                    answers: [{
                        "answer": "True",
                        "isCorrect": true
                    }]
                }]
            };
            
            const newQuizAttempt = new QuizAttempt(quizAttemptDetails);
            
            newQuizAttempt.save()
            .then( doc => {
                quizAttemptId = doc.id;
                done();
            });
        });
        
        
        it("should return status 200 when answer is valid", function(done) {
            QuizController.getQuizAttempt(quizAttemptId, (status, payload) => {
                try{
                    expect(status).to.be.a("number");
                    expect(status).to.equal(200);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
  
        it('should return Quiz Attempt object', function(done) {
            QuizController.getQuizAttempt(quizAttemptId, (status, payload) => {
                try{
                    expect(payload).to.be.a("object");
                    expect(payload.quizAttempt).to.be.a("object");
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
        
        
        
        
    });
});
