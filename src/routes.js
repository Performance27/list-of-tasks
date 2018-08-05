import Months from './components/Months.vue'
import addTask from './components/addNewTask.vue'
import Days from './components/Days.vue'
import listOfTasks from './components/ListOfTasks.vue'
import signIn from './components/Signin.vue'
import signUp from './components/Signup.vue'
import Profile from './components/Profile.vue'

export default [{
    path: '/',
    component: Months
  },
  {
    path: '/add-task',
    component: addTask
  },
  {
    path: '/month-:number',
    component: Days
  },
  {
    path: '/month-:number/:day',
    component: listOfTasks
  },
  {
    path: '/signup',
    component: signUp
  }, {
    path: '/signin',
    component: signIn
  },
  {
    path: '/profile',
    component: Profile,
  }
]
