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
                "questionType": question.questionType,
                "questionMarks": question.hasOwnProperty("questionMarks") ? question.questionMarks : NaN,
                "questionPercentage": question.hasOwnProperty("questionPercentage") ? question.questionPercentage : NaN
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

                // Consolidating scoring
                if (question.hasOwnProperty('questionMarks')) {
                    totalScore += question.questionMarks;
                } else if (question.hasOwnProperty('questionPercentage')) {
                    totalPercentage += question.questionPercentage;
                }
            }
        }

        if (allValid) {
            let assumedQuizMarks = 0;
            if (totalPercentage > 100) {
                // Total Percentage should not be greater than 100. Make all false if that is the case.
                // Invalidate all questions
                allValid = false;
                invalidQuestions = validQuestions;
            } else if (totalPercentage == 100 || totalPercentage == 0) {
                assumedQuizMarks = (totalScore == 0) ? totalQuestions : totalScore;
            } else {
                // Assumption that I am making here is
                // 1. For each question, only either absolute marks or percentage is provided
                // 2. Hence, totalScore should account for the missing percentage that is not accounted for
                // 3. Absolute score shall take precedence over percentage.
                // 4. Meaning somehow if both score and percentage is provided, percentage will be overwritten if it is calculated to be incorrect.
                
                const leftoverPercentage = 100 - totalPercentage;
                assumedQuizMarks = (totalScore / leftoverPercentage) * 100;
            }
            
            // Individual Questions Mark Checking
            validQuestions = this.scoringCorrectness(validQuestions, assumedQuizMarks);
            quizMarks = assumedQuizMarks;
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


    static scoringCorrectness(questions, assumedQuizMarks){
        const newQuestions = [];
        
        for (const question of questions) {
            if ( isNaN(question["questionMarks"]) && isNaN(question["questionPercentage"]) ) {
                question["questionMarks"] = 1;
                question["questionPercentage"] = (1 / questions.length) * 100;
            } else if (isNaN(question["questionPercentage"])) {
                question["questionPercentage"] = ( (question.questionMarks / assumedQuizMarks) * 100 );
            } else {
                question["questionMarks"] = assumedQuizMarks * ( question.questionPercentage / 100 );
            }
            newQuestions.push(question);
        }
        
        return newQuestions;
    }
}

module.exports = QuizService;