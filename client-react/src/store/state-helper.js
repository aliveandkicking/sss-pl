import { TaskModel } from '../shared/models/task-model'
import { dateUtils } from '../shared/utils/dateutils'
import { serverApi } from '../shared/server-api'

let i = 0
const defInitialState = {
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

class StateHelper {
  constructor () {
    this.initialState = defInitialState
  }

  rawDataToTaskModel (rawData) {
    rawData.startDate = dateUtils.fromISOString(rawData.startDate)
    rawData.endDate = dateUtils.fromISOString(rawData.endDate)
    return new TaskModel(rawData)
  }

  taskModelToRawData (taskModel) {
    const rawData = Object.assign({}, taskModel)
    rawData.startDate = dateUtils.toISOString(rawData.startDate)
    rawData.endDate = dateUtils.toISOString(rawData.endDate)
    return rawData
  }

  loadFromString (jsonString) {
    this.initialState = JSON.parse(jsonString)

    this.initialState.initialDate = dateUtils.fromISOString(defInitialState.initialDate)
    for (let key in this.initialState.tasks) {
      if (this.initialState.tasks.hasOwnProperty(key)) {
        this.initialState.tasks[key] =
          this.rawDataToTaskModel(this.initialState.tasks[key])
      }
    }
    this.initialState.editTask.calendarInitialDate =
      dateUtils.fromISOString(this.initialState.editTask.calendarInitialDate)
    if (this.initialState.editTask.task) {
      this.initialState.editTask.task =
        this.rawDataToTaskModel(this.initialState.editTask.task)
    }
  }

  buildJsonString (state) {
    const tempObj = {}

    tempObj.initialDate = dateUtils.toISOString(defInitialState.initialDate)

    tempObj.tasks = {}
    for (let key in state.tasks) {
      if (state.tasks.hasOwnProperty(key)) {
        tempObj.tasks[key] = this.taskModelToRawData(state.tasks[key])
      }
    }

    tempObj.editTask = {}
    tempObj.editTask.calendarInitialDate =
      dateUtils.toISOString(state.editTask.calendarInitialDate)

    if (this.initialState.editTask.task) {
      this.initialState.editTask.task = this.taskModelToRawData(state.editTask.task)
    } else {
      tempObj.editTask.task = null
    }
  }

  loadState () {
    return serverApi.post('load', {})
      .then(response => this.loadFromString(response))
  }

  saveState (state) {
    return serverApi.post('save', this.buildJsonString(state))
  }
}

export const stateHelper = new StateHelper()
