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

  // Get quiz questions without answers
  getQuizQuestionNoAnswer(quizID){
    return http.get(`/quiz/${quizID}/attempt`)
  }
  

  // Submit quiz attempt for marking
  submitQuizAttempt(quizID, questions, username){
    return http.post(`/quiz/${quizID}/submit`, questions, { headers: { 'username': username } })
  }
  
  
}

export default new QuizService();
