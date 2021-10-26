import http from "../http-common";

class QuizService {
  // Create Quiz for a given course and section
  addQuiz(data){

    return http.post('/quiz/add', data)
  }

  // Update the questions in a quiz given quizId
  updateQuizQuestions(quizID, questions){

    return http.put(`/quiz/${quizID}/questions`, questions)
  }

  // Delete quiz given quizID
  deleteQuiz(quizID){

    return http.delete(`/quiz/${quizID}`);
  }
  
  
}

export default new QuizService();
