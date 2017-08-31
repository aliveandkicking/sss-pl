import { combineReducers } from 'redux'
import { dateUtils } from '../core/dateutils'

const calendarInitialDate = (state = dateUtils.today(), action) => {
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

const showingCustomDates = (state = false, action) => {
  if (action.type === 'SET_EDIT_TASK_SHOWING_CUSTOM_DATES') {
    return action.payload.showingCustomDates
  }
  return state
}

export const editTaskReducer = combineReducers({
  task,
  showingCustomDates,
  calendarInitialDate,
  calendarMonthMode
})

