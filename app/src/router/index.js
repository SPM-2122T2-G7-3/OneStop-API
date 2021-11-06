import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import Course from '../views/Course.vue'
import newQuiz from '../views/newQuiz.vue'
import editQuiz from '../views/editQuiz.vue'
import Quiz from '../views/Quiz.vue'
import enrollLearners from '../views/enrollLearners.vue'
import assignTrainers from '../views/assignTrainers.vue'
import createClass from '../views/createClass.vue'
import createCourse from '../views/createCourse.vue'
import withdrawLearners from '../views/withdrawLearners.vue'
import withdrawTrainers from '../views/withdrawTrainers.vue'

import approveSelfEnrollment from '../views/approveSelfEnrollment.vue'



const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
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
  {
    path: '/createClass',
    name: 'createClass',
    component: createClass
  },
  {
    path: '/createCourse',
    name: 'createCourse',
    component: createCourse
  },
  {
    path: '/withdrawLearners',
    name: 'withdrawLearners',
    component: withdrawLearners
  },
  {
    path: '/withdrawTrainers',
    name: 'withdrawTrainers',
    component: withdrawTrainers
  },
  {
    path: '/eligibleCourses',
    name: 'eligibleCourses',
    component: eligibleCourses
  },
  {
    path: '/approveSelfEnrollment',
    name: 'approveSelfEnrollment',
    component: approveSelfEnrollment
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
