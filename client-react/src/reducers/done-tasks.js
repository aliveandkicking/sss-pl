import { dateUtils } from '../core/dateutils'
import {
  CHANGE_DONE_TASK
} from '../actions'

export const doneTasks = (state = {}, action) => {
  if (action.type === CHANGE_DONE_TASK) {
    const dateStr = dateUtils.toISOString(action.payload.date)
    const newState = Object.assign({}, state)
    if (!Array.isArray(newState[dateStr])) {
      newState[dateStr] = []
    }
    let index = newState[dateStr]
      .findIndex(info => info[0] === action.payload.doneTaskInfo[0])
    if (index < 0) {
      newState[dateStr] = newState[dateStr].concat([action.payload.doneTaskInfo])
    } else {
      newState[dateStr][index] = action.payload.doneTaskInfo
    }
    return newState
  }
  return state
}
