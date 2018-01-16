const createAction = (type, ...payloadFields) => {
  return (...payloadData) => {
    if (payloadFields.length !== payloadData.length) {
      console.error('payloadFields.length !== payloadData.length')
      return {}
    }
    const payload = payloadFields.reduce(
      (payloadObj, field, i) => Object.assign(payloadObj, {[field]: payloadData[i]}), {})
    return {type, payload}
  }
}

export const CHANGE_DONE_TASK = 'CHANGE_DONE_TASK'
export const changeDoneTask = createAction(CHANGE_DONE_TASK, 'date', 'doneTaskInfo')

export const CHANGE_TASK = 'CHANGE_TASK'
export const changeTask = createAction(CHANGE_TASK, 'task')

export const DELETE_TASK = 'DELETE_TASK'
export const deleteTask = createAction(DELETE_TASK, 'taskId')

export const SET_EDIT_TASK_SHOWING_CUSTOM_DATES = 'SET_EDIT_TASK_SHOWING_CUSTOM_DATES'
export const setEditTaskShowingCustomDates = createAction(SET_EDIT_TASK_SHOWING_CUSTOM_DATES, 'showingCustomDates')

export const SET_EDIT_TASK_CALENDAR_INITIAL_DATE = 'SET_EDIT_TASK_CALENDAR_INITIAL_DATE'
export const setEditTaskCalendarInitialDate = createAction(SET_EDIT_TASK_CALENDAR_INITIAL_DATE, 'date')

export const SET_EDIT_TASK_CALENDAR_MONTH_MODE = 'SET_EDIT_TASK_CALENDAR_MONTH_MODE'
export const setEditTaskCalendarMonthMode = createAction(SET_EDIT_TASK_CALENDAR_MONTH_MODE, 'monthMode')

export const SET_EDITING_TASK = 'SET_EDITING_TASK'
export const setEditingTask = createAction(SET_EDITING_TASK, 'task')

export const SET_INITIAL_DATE = 'SET_INITIAL_DATE'
export const setInitialDate = createAction(SET_INITIAL_DATE, 'date')

export const SET_PAGE_ID = 'SET_PAGE'
export const setPageId = createAction(SET_PAGE_ID, 'id')

export const SET_MAIN_MENU_EXPANDED_STATE = 'SET_MAIN_MENU_EXPANDED_STATE'
export const setMainMenuExpandedState = createAction(SET_MAIN_MENU_EXPANDED_STATE, 'expanded')

export const SET_STATUS_TEXT = 'SET_STATUS_TEXT'
export const setStatusText = createAction(SET_STATUS_TEXT, 'text')

export const SET_NEED_SAVE = 'SET_NEED_SAVE'
export const setNeedSave = createAction(SET_NEED_SAVE, 'needSave')

export const SET_TAG_DATA = 'SET_TAG_DATA'
export const setTagData = createAction(SET_TAG_DATA, 'tag', 'data')

export const SET_EDITING_TAG = 'SET_EDITING_TAG'
export const setEditingTag = createAction(SET_EDITING_TAG, 'tag')

export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE'
export const setWindowSize = createAction(SET_WINDOW_SIZE, 'width')

export const ADD_GOAL = 'ADD_GOAL'
export const addGoal = createAction(ADD_GOAL, 'data')

export const CHANGE_GOAL = 'CHANGE_GOAL'
export const changeGoal = createAction(CHANGE_GOAL, 'id', 'changes')

export const DELETE_GOAL = 'DELETE_GOAL'
export const deleteGoal = createAction(DELETE_GOAL, 'id')

export const CHANGE_GOAL_TREE = 'CHANGE_GOAL_TREE'
export const changeGoalTree = createAction(CHANGE_GOAL_TREE, 'changes')
