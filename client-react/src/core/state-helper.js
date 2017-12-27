import { TaskModel } from './task-model'
import { dateUtils } from './dateutils'
import { serverApi } from './server-api'

let i = 0
const defInitialState = {
  initialDate: dateUtils.clearTime(new Date()),
  pageId: 0,
  mainMenuExpanded: false,
  tasks: {
    [++i]: new TaskModel({
      id: i,
      name: 'do exercise',
      startDate: new Date(2017, 7),
      repeatModeId: 1,
      includeDates: [dateUtils.clearTime(new Date())],
      tag: 'Work'
    }),
    [++i]: new TaskModel({
      id: i,
      name: 'task with long name',
      startDate: new Date(2017, 7),
      repeatModeId: 1,
      tag: 'Home'
    }),
    [++i]: new TaskModel({
      id: i,
      name: 'repeat every 2',
      startDate: new Date(2017, 7),
      repeatModeId: 1,
      every: 2,
      tag: 'Home',
      timesPerDay: 4
    }),
    [++i]: new TaskModel({
      id: i,
      name: 'sept task',
      startDate: new Date(2017, 8),
      repeatModeId: 1,
      tag: 'Work'
    }),
    [++i]: new TaskModel({
      id: i,
      name: 'clinger winger',
      startDate: new Date(2017, 8),
      repeatModeId: 1,
      every: 2
    })
  },
  doneTasks: {
    [dateUtils.toISOString(new Date())]: [[3, 1, 1], [1, 1, 1], [2, 1, 2]]
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
    try {
      this.initialState = JSON.parse(jsonString)

      this.initialState.initialDate = dateUtils.fromISOString(this.initialState.initialDate)

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
      return true
    } catch (error) {
      console.log(jsonString, error)
      this.initialState = defInitialState
      return false
    }
  }

  buildJsonString (state) {
    const tempObj = {
      initialDate: dateUtils.toISOString(state.initialDate),
      mainMenuExpanded: state.mainMenuExpanded,
      pageId: state.pageId,
      tasks: {},
      tags: state.tags,
      editingTag: state.editingTag,
      doneTasks: state.doneTasks,
      editTask: Object.assign({}, state.editTask)
    }

    for (let key in state.tasks) {
      if (state.tasks.hasOwnProperty(key)) {
        tempObj.tasks[key] = this.taskModelToRawData(state.tasks[key])
      }
    }

    tempObj.editTask.calendarInitialDate =
      dateUtils.toISOString(tempObj.editTask.calendarInitialDate)

    if (state.editTask.task) {
      tempObj.editTask.task = this.taskModelToRawData(state.editTask.task)
    } else {
      tempObj.editTask.task = null
    }

    return JSON.stringify(tempObj)
  }

  loadState (session) {
    return serverApi.post('load', session, {})
      .then(response => {
        if (!this.loadFromString(response)) {
          throw new Error('Cannot load')
        }
      })
  }

  saveState (session, state) {
    return serverApi.post('save', session, this.buildJsonString(state))
  }
}

export const stateHelper = new StateHelper()
