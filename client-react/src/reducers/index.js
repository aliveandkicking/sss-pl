import { combineReducers } from 'redux'
import { editTaskReducer } from './edit-task'
import { dateUtils } from '../shared/utils/dateutils';

const initialDate = (state = new Date(), action) => {
  if (action.type === 'SET_INITIAL_DATE') {
    return dateUtils.clearTime(action.payload.date)
  }
  return state;
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
  return state;
}

const rootReducer = combineReducers({
  initialDate,
  tasks,
  editTask: editTaskReducer
})

export default rootReducer