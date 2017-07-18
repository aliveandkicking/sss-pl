import { combineReducers } from 'redux';

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

const editTaskDialogVisibility = (state = false, action) => {
  if (action.type === 'SET_EDIT_TASK_DIALOG_VISIBILITY') {
    return action.visible
  }
  return state;
}

const rootReducer = combineReducers({
  date,
  tasks,
  editTaskDialogVisibility
})

export default rootReducer