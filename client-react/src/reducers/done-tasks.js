import { dateUtils } from '../core/dateutils'
import {
  ADD_DONE_TASK,
  REMOVE_DONE_TASK,
} from '../actions'

const addDoneTask = (state, action) => {
  const dateStr = dateUtils.toISOString(action.payload.date)
  const newState = Object.assign({}, state)

  if (!Array.isArray(newState[dateStr])) {
    newState[dateStr] = []
  }

  let index = newState[dateStr].findIndex(info => info[0] === action.payload.taskId)
  if (index < 0) {
    newState[dateStr] = newState[dateStr].concat([[action.payload.taskId, 1, 1]])
  } else {
    let info = newState[dateStr][index]
    newState[dateStr][index] = [info[0], info[1] + 1, info[2]]
  }
  return newState
}

const removeDoneTask = (state, action) => {
  const dateStr = dateUtils.toISOString(action.payload.date)
  const newState = Object.assign({}, state)

  if (Array.isArray(newState[dateStr])) {
    let index = newState[dateStr]
      .findIndex(info => info[0] === action.payload.taskId)

    if (index >= 0) {
      let info = newState[dateStr][index]
      if (info[1] < 2) {
        newState[dateStr].splice(index, 1)
      } else {
        newState[dateStr][index] = [info[0], info[1] - 1, info[2]]
      }
    }
  }
  return newState
}

export const doneTasks = (state = {}, action) => {
  if (action.type === ADD_DONE_TASK) {
    return addDoneTask(state, action)
  } else if (action.type === REMOVE_DONE_TASK) {
    return removeDoneTask(state, action)
  }
  return state
}
