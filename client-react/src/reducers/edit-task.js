import { combineReducers } from 'redux';
import { repeatMode } from '../shared/immutable/repeat-modes';
import { TaskModel } from '../shared/models/task-model';

const repeatRulesModes = (state = repeatMode.all, action) => {
  if (action.type === 'SET_REPEATRULES_MODES') {
    return action.repeatRulesModes
  }
  return state;
}

const visible = (state = true, action) => {
  if (action.type === 'SET_EDIT_TASK_DIALOG_VISIBILITY') {
    return action.visible
  }
  return state;
}

const activeMode = (state = 0, action) => {
  if (action.type === 'SET_EDIT_TASK_DIALOG_ACTIVE_MODE') {
    return action.id
  }
  return state;
}

const calendarInitialDate = (state = new Date(), action) => {
  if (action.type === 'SET_EDIT_TASK_DIALOG_CALENDAR_INITIAL_DATE') {
    return action.date
  }
  return state;
}

const calendarMonthMode = (state = false, action) => {
  if (action.type === 'SET_EDIT_TASK_DIALOG_CALENDAR_MONTH_MODE') {
    return action.monthMode
  }
  return state;
}

const taskModel = (state = new TaskModel(), action) => {
  if (action.type === 'SET_EDITING_TASK') {
    return action.task
  } else if (action.type === 'MODIFY_EDITING_TASK') {
    return Object.assign(new TaskModel(false), state, action.modifications)
  }
  return state;
}

export const editTaskReducer = combineReducers({
  visible,
  repeatRulesModes,
  activeMode,
  calendarInitialDate,
  calendarMonthMode,
  taskModel
})

