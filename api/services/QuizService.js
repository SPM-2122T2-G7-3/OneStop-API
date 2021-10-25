class QuizService {
    static checkQuestionsValidity(questions) {
        let allValid = false;
        let validQuestions = [];
        let invalidQuestions = [];

        let totalScore = 0;
        let totalPercentage = 0;
        let quizMarks = NaN;
        const totalQuestions = questions.length;

        for (const question of questions) {
            const questionDetails = {
                "questionText": question.questionText,
                "questionType": question.questionType
            };

            if (question.questionText) {
                let questionValid = false;
                switch (question.questionType) {
                    case "TF":
                        questionDetails["answerOptions"] = ["True", "False"];
                        questionDetails["correctAnswers"] = question.correctAnswers[0];
                        questionValid = this.checkTrueFalseAnswer(question.correctAnswers[0]);
                        questionValid ? validQuestions.push(questionDetails) : invalidQuestions.push(question);
                        allValid = questionValid;
                        break;
                    default:
                        invalidQuestions.push(question);
                        allValid = false;
                }
            }
        }
        
        const questionsArray = allValid ? validQuestions : invalidQuestions;
        return {
            allValid,
            questionsArray
        };
    }
    
    static checkTrueFalseAnswer(correctAnswer){
        const standardAns = ["True", "False"];
        return standardAns.includes(correctAnswer);
    }
}

module.exports = QuizService;