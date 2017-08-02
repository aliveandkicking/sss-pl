export const setDate = date => {
  return {
    type: 'SET_DATE',
    date
  }
}

export const setTasks = tasks => {
  return {
    type: 'SET_TASKS',
    tasks
  }
}

export const setEditTaskVisibility = visible => {
  return {
    type: 'SET_EDIT_TASK_DIALOG_VISIBILITY',
    visible
  }
}

export const setEditTaskDialogActiveMode = id => {
  return {
    type: 'SET_EDIT_TASK_DIALOG_ACTIVE_MODE',
    id
  }
}

export const setEditTaskDialogCalendarInitialDate = date => {
  return {
    type: 'SET_EDIT_TASK_DIALOG_CALENDAR_INITIAL_DATE',
    date
  }
}

export const setEditTaskDialogCalendarMonthMode = monthMode => {
  return {
    type: 'SET_EDIT_TASK_DIALOG_CALENDAR_MONTH_MODE',
    monthMode
  }
}

export const setEditingTask = task => {
  return {
    type: 'SET_EDITING_TASK',
    task
  }
}

export const modifyEditingTask = modifications => {
  return {
    type: 'MODIFY_EDITING_TASK',
    modifications
  }
}
