const createAction = function() {
  const initialData = arguments
  return function() {
    const payload = {}
    for (let i = 1; i < initialData.length; i++) {
      payload[initialData[i]] = arguments[i-1]
    }
    console.log(initialData[0], payload)
    return {type: initialData[0], payload}
  }
}

export const changeTask = createAction('CHANGE_TASK', 'task')
export const setInitialDate = createAction('SET_INITIAL_DATE', 'date')
export const setEditTaskCalendarInitialDate = createAction('SET_EDIT_TASK_CALENDAR_INITIAL_DATE', 'date')
export const setEditTaskCalendarMonthMode = createAction('SET_EDIT_TASK_CALENDAR_MONTH_MODE', 'monthMode')
export const setEditingTask = createAction('SET_EDITING_TASK', 'task')
export const addDoneTask = createAction('ADD_DONE_TASK', 'date', 'taskId')
export const removeDoneTask = createAction('REMOVE_DONE_TASK', 'date', 'taskId')
