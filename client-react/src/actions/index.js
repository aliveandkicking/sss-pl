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
