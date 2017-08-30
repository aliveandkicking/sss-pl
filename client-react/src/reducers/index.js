import { combineReducers } from 'redux'
import { editTaskReducer } from './edit-task'
import { dateUtils } from '../shared/utils/dateutils'

const initialDate = (state = dateUtils.today(), action) => {
  if (action.type === 'SET_INITIAL_DATE') {
    return dateUtils.clearTime(action.payload.date)
  }
  return state
}

const taskListVisible = (state = false, action) => {
  if (action.type === 'SET_TASK_LIST_VISIBILITY') {
    return action.payload.visible
  }
  return state
}

const mainMenuExpanded = (state = false, action) => {
  if (action.type === 'SET_MAIN_MENU_EXPANDED_STATE') {
    return action.payload.expanded
  }
  return state
}

const tasks = (state = {}, action) => {
  if (action.type === 'CHANGE_TASK') {
    const newState = {...state}
    newState[action.payload.task.id] = action.payload.task
    return newState
  } else if (action.type === 'DELETE_TASK') {
    const newState = {}
    const idToDelete = action.payload.taskId.toString()
    for (let key in state) {
      if (state.hasOwnProperty(key)) {
        if (key !== idToDelete) {
          newState[key] = state[key]
        }
      }
    }
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
      newState[dateStr] = newState[dateStr]
        .filter(taskId => action.payload.taskId !== taskId)
    }
    return newState
  }
  return state
}

export const rootReducer = combineReducers({
  initialDate,
  mainMenuExpanded,
  taskListVisible,
  tasks,
  doneTasks,
  editTask: editTaskReducer
})