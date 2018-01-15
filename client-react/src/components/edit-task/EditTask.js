import { connect } from 'react-redux'
import { EditTaskView } from './EditTaskView'
import {
  changeTask,
  deleteTask,
  setEditingTask,
  setEditTaskShowingCustomDates
} from '../../actions'
import { TaskModel, repeatMode } from '../../core'

const processWeekDay = (weekDays, day) => {
  const result = Array.from(weekDays)
  const index = result.indexOf(day)
  if (index >= 0) {
    result.splice(index, 1)
  } else {
    result.push(day)
  }
  return result
}

const mapStateToProps = (state, ownProps) => {
  return {
    editingTask: state.editTask.task,
    tasks: state.tasks,
    showingCustomDates: state.editTask.showingCustomDates,
    goals: state.goals
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { editingTask, tasks, showingCustomDates, goals } = stateProps

  const changeEditingTask = changes =>
    dispatch(setEditingTask(new TaskModel(editingTask, changes)))

  const processCalendarClick = (cell) => {
    if (showingCustomDates) {
      if (!cell.isWeekDay) {
        const dateTime = cell.data.getTime()
        if (editingTask.skipDates.includes(dateTime)) {
          changeEditingTask({skipDates: editingTask.skipDates.filter(el => el !== dateTime)})
        } else if (editingTask.includeDates.includes(dateTime)) {
          changeEditingTask({includeDates: editingTask.includeDates.filter(el => el !== dateTime)})
        } else if (editingTask.containsDate(cell.data)) {
          changeEditingTask({skipDates: editingTask.skipDates.concat(dateTime)})
        } else {
          changeEditingTask({includeDates: editingTask.includeDates.concat(dateTime)})
        }
      }
      return
    }

    const changeStartDate = () => {
      const startDiff = cell.data.getTime() - editingTask.startDate.getTime()
      const endDiff = cell.data.getTime() - editingTask.endDate.getTime()
      return (startDiff < 0) ||
        editingTask.repeatModeId === repeatMode.once.id ||
        (Math.abs(startDiff) < Math.abs(endDiff))
    }
    if (cell.isWeekDay) {
      const changes = {}
      if (editingTask.repeatModeId === repeatMode.weekly.id) {
        changes.weeklyDays = processWeekDay(editingTask.weeklyDays, cell.data)
      } else {
        changes.repeatModeId = repeatMode.weekly.id
        changes.weeklyDays = [cell.data]
      }
      changeEditingTask(changes)
    } else {
      if (changeStartDate()) {
        changeEditingTask({startDate: cell.data})
      } else {
        changeEditingTask({endDate: cell.data, neverEnd: false})
      }
    }
  }

  const getNewTaskId = () => {
    return Object.keys(tasks)
      .reduce((maxId, key) => (maxId < tasks[key].id) ? tasks[key].id : maxId, 0) + 1
  }

  const getPredefinedTags = () => {
    const result = []
    Object.keys(tasks).forEach(
      key => !result.includes(tasks[key].tag) && result.push(tasks[key].tag))
    return result
  }

  Object.keys(tasks).map(key => tasks[key].name)

  const close = (submit) => {
    if (submit) {
      const taskToSubmit = new TaskModel(editingTask)
      if (!taskToSubmit.id) {
        taskToSubmit.id = getNewTaskId()
      }
      dispatch(changeTask(taskToSubmit))
    }
    dispatch(setEditingTask(null))
    dispatch(setEditTaskShowingCustomDates(false))
  }

  const checkCalendarCellSelection = (data, isWeekDay) => {
    if (isWeekDay) {
      if (editingTask.repeatModeId === repeatMode.weekly.id) {
        return editingTask.weeklyDays.includes(data)
      }
    } else {
      return editingTask.containsDate(data)
    }
    return false
  }

  return {
    task: editingTask,
    predefinedNames: Object.keys(tasks).reduce((result, key) => {
      if (!result.includes(tasks[key].name)) {
        result.push(tasks[key].name)
      }
      return result
    }, []),
    predefinedTags: getPredefinedTags(),
    showingCustomDates,
    goals,
    onChanges: changeEditingTask,
    onClose: close,
    onDelete: () => {
      if (editingTask.id) {
        dispatch(deleteTask(editingTask.id))
      }
      dispatch(setEditingTask(null))
    },
    onProcessWeekDay: processWeekDay,
    onCalendarCellClick: processCalendarClick,
    onCheckCalendarCellSelection: checkCalendarCellSelection,
    onShowingCustomDatesChange: show => dispatch(setEditTaskShowingCustomDates(show))
  }
}

export const EditTask = connect(
  mapStateToProps,
  null,
  mergeProps
)(EditTaskView)
