import { combineReducers } from 'redux'
import { editTaskReducer } from './edit-task'
import {
  dateUtils,
  pages
} from '../core'
import { doneTasks } from './done-tasks'

import {
  SET_INITIAL_DATE,
  SET_PAGE_ID,
  SET_MAIN_MENU_EXPANDED_STATE,
  CHANGE_TASK,
  DELETE_TASK,
  SET_STATUS_TEXT,
  SET_NEED_SAVE,
  SET_TAG_DATA,
  SET_EDITING_TAG,
  SET_WINDOW_SIZE,
  ADD_GOAL,
  CHANGE_GOAL,
  DELETE_GOAL
} from '../actions'

const initialDate = (state = dateUtils.today(), action) => {
  if (action.type === SET_INITIAL_DATE) {
    return dateUtils.clearTime(action.payload.date)
  }
  return state
}

const pageId = (state = 0, action) => {
  if (action.type === SET_PAGE_ID) {
    if (pages.ids.includes(action.payload.id)) {
      return action.payload.id
    }
  }
  return state
}

const mainMenuExpanded = (state = false, action) => {
  if (action.type === SET_MAIN_MENU_EXPANDED_STATE) {
    return action.payload.expanded
  }
  return state
}

const statusText = (state = 'working', action) => {
  if (action.type === SET_STATUS_TEXT) {
    return action.payload.text
  }
  return state
}

const needSave = (state = false, action) => {
  if (action.type === SET_NEED_SAVE) {
    return action.payload.needSave
  }
  return state
}

const tasks = (state = {}, action) => {
  if (action.type === CHANGE_TASK) {
    const newState = {...state}
    newState[action.payload.task.id] = action.payload.task
    return newState
  } else if (action.type === DELETE_TASK) {
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

const tags = (state = {}, action) => {
  if (action.type === SET_TAG_DATA) {
    if (action.payload.tag) {
      const newState = {...state}
      newState[action.payload.tag] = {
        ...newState[action.payload.tag],
        ...action.payload.data
      }
      return newState
    }
  }
  return state
}

const editingTag = (state = null, action) => {
  if (action.type === SET_EDITING_TAG) {
    return action.payload.tag
  }
  return state
}

const windowSize = (state = window.innerWidth, action) => {
  if (action.type === SET_WINDOW_SIZE) {
    return action.payload.width
  }
  return state
}

const goals = (state = [], action) => {
  if (action.type === ADD_GOAL) {
    return state.concat(action.data)
  } else if (action.type === CHANGE_GOAL) {
    const index = state.findIndex(goal => goal.id === action.id)
    if (index === 0 || index) {
      const newState = Array.from(state)
      newState[index] = Object.assign(state[index], action.changes)
      return newState
    }
  } else if (action.type === DELETE_GOAL) {
    return state.filter(goal => goal.id === action.id)
  }
  return state
}

export const rootReducer = combineReducers({
  needSave,
  pageId,
  initialDate,
  mainMenuExpanded,
  statusText,
  goals,
  tasks,
  tags,
  doneTasks,
  editingTag,
  editTask: editTaskReducer,
  windowSize
})
