import { TaskModel } from '../shared/models/task-model'
import { dateUtils } from '../shared/utils/dateutils'
// import { buildJsonString, loadFromJsonString } from '../shared/utils/json-processor'

// import { serverApi } from '../shared/server-api'

let i = 0
const state = {
  initialDate: dateUtils.clearTime(new Date()),
  tasks: {
    [++i]: {
      id: i,
      name: 'do exercise',
      startDate: new Date(2017, 7),
      repeatModeId: 1,
      includeDates: [dateUtils.clearTime(new Date())]
    },
    [++i]: {
      id: i,
      name: 'task with long name',
      startDate: new Date(2017, 7),
      repeatModeId: 1
    },
    [++i]: {
      id: i,
      name: 'repeat every 2',
      startDate: new Date(2017, 7),
      repeatModeId: 1,
      every: 2
    },
    [++i]: {
      id: i,
      name: 'sept task',
      startDate: new Date(2017, 8),
      repeatModeId: 1
    }
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
  for (let key in state.tasks) {
    if (state.tasks.hasOwnProperty(key)) {
      state.tasks[key] = new TaskModel(state.tasks[key])
    }
  }
}

export const loadState = () => {
  // loadFromJsonString(state, '')

  // serverApi.post({}).then(response => console.log(response))

  normalizeState()

  return {
    loaded: false,
    state
  }
}

export const saveState = () => {
  // buildJsonString(state)
}
