import { TaskModel } from '../shared/models/task-model'
import { dateUtils } from '../shared/utils/dateutils'
import { serverApi } from '../shared/server-api'

let i = 0
let initialState = {
  initialDate: dateUtils.clearTime(new Date()),
  tasks: {
    [++i]: new TaskModel({
      id: i,
      name: 'do exercise',
      startDate: new Date(2017, 7),
      repeatModeId: 1,
      includeDates: [dateUtils.clearTime(new Date())]
    }),
    [++i]: new TaskModel({
      id: i,
      name: 'task with long name',
      startDate: new Date(2017, 7),
      repeatModeId: 1
    }),
    [++i]: new TaskModel({
      id: i,
      name: 'repeat every 2',
      startDate: new Date(2017, 7),
      repeatModeId: 1,
      every: 2
    }),
    [++i]: new TaskModel({
      id: i,
      name: 'sept task',
      startDate: new Date(2017, 8),
      repeatModeId: 1
    })
  },
  doneTasks: {
    [dateUtils.toISOString(new Date())]: [3, 2]
  },
  editTask: {
    calendarInitialDate: dateUtils.clearTime(new Date()),
    calendarMonthMode: false,
    task: null,
    showingCustomDates: false
  }
}

const normalizeState = () => {
  initialState.initialDate = dateUtils.fromISOString(initialState.initialDate)
  for (let key in initialState.tasks) {
    if (initialState.tasks.hasOwnProperty(key)) {
      let task = initialState.tasks[key]
      task.startDate = dateUtils.fromISOString(task.startDate)
      task.endDate = dateUtils.fromISOString(task.endDate)
      initialState.tasks[key] = new TaskModel(initialState.tasks[key])
    }
  }
  initialState.editTask.calendarInitialDate = dateUtils.fromISOString(initialState.editTask.calendarInitialDate)
  if (initialState.editTask.task) {
    let task = initialState.editTask.task
    task.startDate = dateUtils.fromISOString(task.startDate)
    task.endDate = dateUtils.fromISOString(task.endDate)
    initialState.editTask.task = new TaskModel(task)
  }
  console.log('normalized', initialState)
}

export const loadState = () => {
  return serverApi.post('load', {})
    .then(response => {
      console.log(response)
      initialState = JSON.parse(response)
      normalizeState()
    })
    .catch(() => {})
}

export const saveState = (state) => {
  serverApi.post('save', state).then(response => {
    console.log(response)
  })
}

export const getInitialState = () => {
  return initialState
}
