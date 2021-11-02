import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Course from '../views/Course.vue'
import newQuiz from '../views/newQuiz.vue'
import editQuiz from '../views/editQuiz.vue'
import Quiz from '../views/Quiz.vue'
import enrollLearners from '../views/enrollLearners.vue'
import assignTrainers from '../views/assignTrainers.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/course/:courseID',
    name: 'Course',
    component: Course
  },
  {
    path: '/myTeachingCourses/:courseID/manageCourse/newQuiz',
    name: 'newQuiz',
    component: newQuiz
  },
  {
    path: '/myTeachingCourses/:courseID/manageCourse/quiz/:quizID/edit',
    name: 'editQuiz',
    component: editQuiz
  },
  {
    path: '/quiz/:quizID',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/enrollLearners',
    name: 'enrollLearners',
    component: enrollLearners
  },
  {
    path: '/assignTrainers',
    name: 'assignTrainers',
    component: assignTrainers
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
