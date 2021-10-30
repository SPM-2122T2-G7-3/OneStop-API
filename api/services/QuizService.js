class QuizService {
    static checkQuestionsValidity(questions) {
        let allValid = false;
        let validQuestions = [];
        let invalidQuestions = [];

        let quizMarks = 0;

        for (const question of questions) {
            const questionDetails = {
                "questionText": question.questionText,
                "questionType": question.questionType,
                "questionMarks": question.hasOwnProperty("questionMarks") ? question.questionMarks : 1
            };

            if (question.questionType) {
                let questionValid = false;
                switch (question.questionType) {
                    case "TF":
                        questionDetails["answerOptions"] = ["True", "False"];
                        questionDetails["correctAnswers"] = question.correctAnswers[0];
                        questionValid = this.checkTrueFalseAnswer(question.correctAnswers[0]);
                        questionValid ? validQuestions.push(questionDetails) : invalidQuestions.push(question);
                        allValid = questionValid;
                        break;
                    case "MCQ":
                        questionDetails["answerOptions"] = question.answerOptions;
                        questionDetails["correctAnswers"] = question.correctAnswers;
                        questionValid = this.checkMCQAnswer(question.answerOptions, question.correctAnswers);
                        questionValid ? validQuestions.push(questionDetails) : invalidQuestions.push(question);
                        allValid = questionValid;
                        break;
                    default:
                        invalidQuestions.push(question);
                        allValid = false;
                }

                quizMarks += questionValid ? questionDetails.questionMarks : 0;
            }
        }
        
        const questionsArray = allValid ? validQuestions : invalidQuestions;
        return {
            allValid,
            questionsArray,
            quizMarks
        };
    }
    
    static checkTrueFalseAnswer(correctAnswer){
        const standardAns = ["True", "False"];
        return standardAns.includes(correctAnswer);
    }
    
    
    static checkMCQAnswer(answerOptions, correctAnswers){
        for (const answer of correctAnswers){
            if (!answerOptions.includes(answer)){
                return false;
            }
        }
        return true;
    }


    static checkLearnerAnswerValidity(questions) {
        let allValid = true;
        let validQuestions = [];
        let invalidQuestions = [];
        
        for (const question of questions) {
            if (question.hasOwnProperty("questionId") && question.hasOwnProperty('answers')) {
                let answerNoIssue = question.answers.length > 0;
                
                for (const answer in question.answers) {
                    answerNoIssue = answerNoIssue && answer;
                }
                
                if (question.questionId && answerNoIssue) {
                    validQuestions.push(question);
                } else {
                    allValid = false;
                    invalidQuestions.push(question);
                }
            }
        }
        
        const questionsArray = allValid ? validQuestions : invalidQuestions;
        return {
            allValid,
            questionsArray
        };
    }
}

module.exports = QuizService;