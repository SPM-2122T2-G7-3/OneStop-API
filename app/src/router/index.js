import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import Course from '../views/Course.vue'
import newQuiz from '../views/newQuiz.vue'
import editQuiz from '../views/editQuiz.vue'
import Quiz from '../views/Quiz.vue'
import Result from '../views/result.vue'
import manageCourse from '../views/manageCourse.vue'
import enrollLearners from '../views/enrollLearners.vue'
import assignTrainers from '../views/assignTrainers.vue'
import createClass from '../views/createClass.vue'
import createCourse from '../views/createCourse.vue'
import withdrawLearners from '../views/withdrawLearners.vue'
import withdrawTrainers from '../views/withdrawTrainers.vue'
import eligibleCourses from '../views/eligibleCourses.vue'
import approveSelfEnrollment from '../views/approveSelfEnrollment.vue'
import myCourses from '../views/myCourses.vue'
import myTeachingCourses from '../views/myTeachingCourses.vue'
import AllCourses from '../views/AllCourses.vue'


const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/myCourse/:classID',
    name: 'Course',
    component: Course
  },
  {
    path: '/myTeachingCourses/:classID/manageCourse',
    name: 'manageCourse',
    component: manageCourse
  },
  {
    path: '/newQuiz/:classID/:chapterID/:sectionID',
    name: 'newQuiz',
    component: newQuiz
  },
  {
    path: '/myTeachingCourses/:classID/manageCourse/quiz/:quizID/edit',
    name: 'editQuiz',
    component: editQuiz
  },
  {
    path: '/class/:classID/quiz/:quizID',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/class/:classID/quiz/:quizID/result/:attemptID',
    name: 'Result',
    component: Result
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
  {
    path: '/myCourses',
    name: 'myCourses',
    component: myCourses
  },
  {
    path: '/myTeachingCourses',
    name: 'myTeachingCourses',
    component: myTeachingCourses
  },
  {
    path: '/allCourses',
    name: 'AllCourses', 
    component: AllCourses
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
