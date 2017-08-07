const createAction = (type) => {
  return (payload) => {
    return {type, payload}
  }
}

export const addTask = createAction('ADD_TASK')
export const changeTask = createAction('CHANGE_TASK')
export const setInitialDate = createAction('SET_INITIAL_DATE')
export const setEditTaskCalendarInitialDate = createAction('SET_EDIT_TASK_CALENDAR_INITIAL_DATE')
export const setEditTaskCalendarMonthMode = createAction('SET_EDIT_TASK_CALENDAR_MONTH_MODE')
export const setEditingTaskId = createAction('SET_EDITING_TASK_ID')
export const addDoneTask = createAction('ADD_DONE_TASK')
export const removeDoneTask = createAction('REMOVE_DONE_TASK')
