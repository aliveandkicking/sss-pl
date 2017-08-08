import { combineReducers } from 'redux';

const calendarInitialDate = (state = new Date(), action) => {
  if (action.type === 'SET_EDIT_TASK_CALENDAR_INITIAL_DATE') {
    return action.payload.date
  }
  return state
}

const calendarMonthMode = (state = false, action) => {
  if (action.type === 'SET_EDIT_TASK_CALENDAR_MONTH_MODE') {
    return action.payload.monthMode
  }
  return state
}

const task = (state = null, action) => {
  if (action.type === 'SET_EDITING_TASK') {
    return action.payload.task
  }
  return state
}

export const editTaskReducer = combineReducers({
  task,
  calendarInitialDate,
  calendarMonthMode
})

