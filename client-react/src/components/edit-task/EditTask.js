import { connect } from 'react-redux'
import { EditTaskView } from './EditTaskView'
import {
  changeTask,
  deleteTask,
  setEditingTask,
  setEditTaskShowingCustomDates
} from '../../actions'
import { TaskModel } from '../../shared/models/task-model'
import { repeatMode } from '../../shared/immutable/repeat-modes';

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
    showingCustomDates: state.editTask.showingCustomDates
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { editingTask, tasks, showingCustomDates} = stateProps

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
      return (startDiff < 0)
        || editingTask.repeatModeId === repeatMode.once.id
        || (Math.abs(startDiff) < Math.abs(endDiff))
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
    let maxId = 0;
    for (let key in tasks) {
      if (maxId < tasks[key].id) {
        maxId = tasks[key].id
      }
    }
    return ++maxId
  }

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
    showingCustomDates,
    task: editingTask,
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
