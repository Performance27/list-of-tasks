import Months from './components/Months.vue'
import addTask from './components/addNewTask.vue'
import Days from './components/Days.vue'
import listOfTasks from './components/ListOfTasks.vue'

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
  }
]
