import { combineReducers } from 'redux';

const calendarInitialDate = (state = new Date(), action) => {
  if (action.type === 'SET_EDIT_TASK_CALENDAR_INITIAL_DATE') {
    return action.payload.date
  }
  return state;
}

const calendarMonthMode = (state = false, action) => {
  if (action.type === 'SET_EDIT_TASK_CALENDAR_MONTH_MODE') {
    return action.payload.monthMode
  }
  return state;
}

const taskId = (state = null, action) => {
  if (action.type === 'SET_EDITING_TASK_ID') {
    return action.payload.id
  }
  return state;
}

const isNew = (state = null, action) => {
  if (action.type === 'SET_EDITING_TASK_ID') {
    return Boolean(action.payload.isNew)
  }
  return state;
}

export const editTaskReducer = combineReducers({
  taskId,
  isNew,
  calendarInitialDate,
  calendarMonthMode
})

