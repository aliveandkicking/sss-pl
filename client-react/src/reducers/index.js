import { combineReducers } from 'redux';
import { editTaskReducer } from './edit-task';

const date = (state = new Date(), action) => {
  if (action.type === 'SET_DATE') {
    return action.date
  }
  return state
}

const tasks = (state = [], action) => {
  if (action.type === 'SET_TASKS') {
    return action.tasks
  }
  return state;
}

const rootReducer = combineReducers({
  date,
  tasks,
  editTaskDialog: editTaskReducer
})

export default rootReducer