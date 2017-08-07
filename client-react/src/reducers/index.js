import { combineReducers } from 'redux'
import { editTaskReducer } from './edit-task'
import { dateUtils } from '../shared/utils/dateutils'

const initialDate = (state = new Date(), action) => {
  if (action.type === 'SET_INITIAL_DATE') {
    return dateUtils.clearTime(action.payload.date)
  }
  return state
}

const tasks = (state = {}, action) => {
  if (action.type === 'ADD_TASK') {
    return {
      ...state,
      [action.payload.task.id]: action.payload.task
    }
  } else if (action.type === 'CHANGE_TASK') {
    const newState = {...state}
    newState[action.payload.task.id] = action.payload.task
    return newState
  }
  return state
}

const doneTasks = (state = {}, action) => {
  if (action.type === 'ADD_DONE_TASK') {
    const dateStr = dateUtils.toISOString(action.payload.date)
    const newState = Object.assign({}, state)
    if (!Array.isArray(newState[dateStr])) {
      newState[dateStr] = []
    }
    if (!newState[dateStr].includes(action.payload.taskId)) {
      newState[dateStr] = newState[dateStr].concat(action.payload.taskId)
    }
    return newState
  }
  if (action.type === 'REMOVE_DONE_TASK') {
    const dateStr = dateUtils.toISOString(action.payload.date)
    const newState = Object.assign({}, state)
    if (Array.isArray(newState[dateStr])) {
      newState[dateStr] = newState[dateStr].filter(taskId => action.payload.taskId !== taskId)
    }
    return newState
  }
  return state
}

const rootReducer = combineReducers({
  initialDate,
  tasks,
  doneTasks,
  editTask: editTaskReducer
})

export default rootReducer
