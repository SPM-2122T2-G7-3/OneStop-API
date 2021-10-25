const expect = require('chai').expect;
const QuestionService = require('../../services/QuizService');

describe('QuestionService', function() {
    describe("checkTrueFalseAnswer Function", function() {
        it("should return true when 'True' is the correct ans", function() {
            const result = QuestionService.checkTrueFalseAnswer("True");
            expect(result).to.be.a("boolean");
            expect(result).to.equal(true);
        });
        
        
        it("should return true when 'False' is the correct ans", function() {
            const result = QuestionService.checkTrueFalseAnswer("False");
            expect(result).to.be.a("boolean");
            expect(result).to.equal(true);
        });
        
        
        it("should return false when neither 'True' or 'False' is the correct ans", function() {
            const result = QuestionService.checkTrueFalseAnswer("Truety");
            expect(result).to.be.a("boolean");
            expect(result).to.equal(false);
        });
    }); 
});