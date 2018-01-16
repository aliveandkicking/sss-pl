import {
  TaskModel,
  dateUtils
} from '.'
import { serverApi } from './server-api'
import { defInitialState } from './initialState'

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
      console.error(jsonString, error)
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
      goals: state.goals,
      goalsTree: state.goalsTree,
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
