// Primary Author: Lim Hui Ann Shermin

const expect = require('chai').expect;
const QuestionService = require('../../services/QuizService');

describe('QuestionService', function () {
    describe("checkTrueFalseAnswer Function", function () {
        it("should return true when 'True' is the correct ans", function () {
            const result = QuestionService.checkTrueFalseAnswer("True");
            expect(result).to.be.a("boolean");
            expect(result).to.equal(true);
        });


        it("should return true when 'False' is the correct ans", function () {
            const result = QuestionService.checkTrueFalseAnswer("False");
            expect(result).to.be.a("boolean");
            expect(result).to.equal(true);
        });


        it("should return false when neither 'True' or 'False' is the correct ans", function () {
            const result = QuestionService.checkTrueFalseAnswer("Truety");
            expect(result).to.be.a("boolean");
            expect(result).to.equal(false);
        });
    });


    describe("checkMCQAnswer Function", function () {
        it("should return true when all the options is in the correct ans", function () {
            const answerOptions = [
                "HP LaserJet Pro M15w Printer",
                "HP LaserJet Pro MFP M28w Printer",
                "HP Color LaserJet Pro MFP M283fdw",
                "HP LaserJet Pro MFP M227fdw"
            ]
            const correctAnswers = [
                "HP LaserJet Pro M15w Printer"
            ]

            const result = QuestionService.checkMCQAnswer(answerOptions, correctAnswers);
            expect(result).to.be.a("boolean");
            expect(result).to.equal(true);
        });


        it("should return false when one of the option is not in the correct ans", function () {
            const answerOptions = [
                "HP LaserJet Pro M15w Printer",
                "HP LaserJet Pro MFP M28w Printer",
                "HP Color LaserJet Pro MFP M283fdw",
                "HP LaserJet Pro MFP M227fdw"
            ]
            const correctAnswers = [
                "Xerox WorkCentre 7845"
            ]

            const result = QuestionService.checkMCQAnswer(answerOptions, correctAnswers);
            expect(result).to.be.a("boolean");
            expect(result).to.equal(false);
        });
    });


    describe("checkQuestionsValidity Function", function () {
        it("should return allValid true when provided with a set of questions containing all valid answers", function () {
            const questions = [{
                "questionText": "Which of the following do not have SCAN function",
                "questionType": "MCQ",
                "answerOptions": [
                    "HP LaserJet Pro M15w Printer",
                    "HP LaserJet Pro MFP M28w Printer",
                    "HP Color LaserJet Pro MFP M283fdw",
                    "HP LaserJet Pro MFP M227fdw"
                ],
                "correctAnswers": [
                    "HP LaserJet Pro M15w Printer"
                ]
            }];


            const {
                allValid
            } = QuestionService.checkQuestionsValidity(questions);
            expect(allValid).to.be.a("boolean");
            expect(allValid).to.equal(true);
        });


        it("should return the original set of questions when it contains all valid answers", function () {
            const questions = [{
                "questionText": "Which of the following do not have SCAN function",
                "questionType": "MCQ",
                "questionMarks": 1,
                "answerOptions": [
                    "HP LaserJet Pro M15w Printer",
                    "HP LaserJet Pro MFP M28w Printer",
                    "HP Color LaserJet Pro MFP M283fdw",
                    "HP LaserJet Pro MFP M227fdw"
                ],
                "correctAnswers": [
                    "HP LaserJet Pro M15w Printer"
                ]
            }];


            const {
                questionsArray
            } = QuestionService.checkQuestionsValidity(questions);
            expect(questionsArray).to.be.a("array");
            expect(questionsArray).to.deep.equal(questions);
        });


        it("should return allValid false when provided with a set of questions containing invalid answers", function () {
            const questions = [{
                "questionText": "Which of the following do not have SCAN function",
                "questionType": "MCQ",
                "answerOptions": [
                    "HP LaserJet Pro M15w Printer",
                    "HP LaserJet Pro MFP M28w Printer",
                    "HP Color LaserJet Pro MFP M283fdw",
                    "HP LaserJet Pro MFP M227fdw"
                ],
                "correctAnswers": [
                    "Xerox WorkCentre 7845"
                ]
            }];


            const {
                allValid
            } = QuestionService.checkQuestionsValidity(questions);
            expect(allValid).to.be.a("boolean");
            expect(allValid).to.equal(false);
        });


        it("should return only the invalid questions when provided with a set of questions containing invalid answers", function () {
            const questions = [{
                    "questionText": "Which of the following do not have SCAN function",
                    "questionType": "MCQ",
                    "answerOptions": [
                        "HP LaserJet Pro M15w Printer",
                        "HP LaserJet Pro MFP M28w Printer",
                        "HP Color LaserJet Pro MFP M283fdw",
                        "HP LaserJet Pro MFP M227fdw"
                    ],
                    "correctAnswers": [
                        "HP LaserJet Pro M15w Printer"
                    ]
                },
                {
                    "questionText": "Which of the following do not have SCAN function",
                    "questionType": "MCQ",
                    "answerOptions": [
                        "HP LaserJet Pro M15w Printer",
                        "HP LaserJet Pro MFP M28w Printer",
                        "HP Color LaserJet Pro MFP M283fdw",
                        "HP LaserJet Pro MFP M227fdw"
                    ],
                    "correctAnswers": [
                        "Xerox WorkCentre 7845"
                    ]
                }
            ];

            const invalidQuestion = [{
                "questionText": "Which of the following do not have SCAN function",
                "questionType": "MCQ",
                "answerOptions": [
                    "HP LaserJet Pro M15w Printer",
                    "HP LaserJet Pro MFP M28w Printer",
                    "HP Color LaserJet Pro MFP M283fdw",
                    "HP LaserJet Pro MFP M227fdw"
                ],
                "correctAnswers": [
                    "Xerox WorkCentre 7845"
                ]
            }]

            const {
                questionsArray
            } = QuestionService.checkQuestionsValidity(questions);
            expect(questionsArray).to.be.a("array");
            expect(questionsArray).to.deep.equal(invalidQuestion);
        });
    });


    describe("checkLearnerAnswerValidity Function", function () {
        it("should return allValid true when provided with a set of questions containing all valid answers", function () {
            const questions = [{
                "questionText": "Which of the following do not have SCAN function",
                "questionType": "MCQ",
                "answerOptions": [
                    "HP LaserJet Pro M15w Printer",
                    "HP LaserJet Pro MFP M28w Printer",
                    "HP Color LaserJet Pro MFP M283fdw",
                    "HP LaserJet Pro MFP M227fdw"
                ],
                "correctAnswers": [
                    "HP LaserJet Pro M15w Printer"
                ]
            }];


            const {
                allValid
            } = QuestionService.checkLearnerAnswerValidity(questions);
            expect(allValid).to.be.a("boolean");
            expect(allValid).to.equal(true);
        });
    });
});