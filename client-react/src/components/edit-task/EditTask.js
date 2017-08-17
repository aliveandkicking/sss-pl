import { connect } from 'react-redux'
import { EditTaskView } from './EditTaskView'
import { changeTask, setEditingTask } from '../../actions'
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
    tasks: state.tasks
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { editingTask, tasks} = stateProps

  const processCalendarClick = (cell) => {

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
      dispatch(setEditingTask(new TaskModel(editingTask, changes)))
    } else {
      if (changeStartDate()) {
        dispatch(setEditingTask(new TaskModel(editingTask, {startDate: cell.data})))
      } else {
        dispatch(setEditingTask(new TaskModel(editingTask, {
          endDate: cell.data,
          neverEnd: false
        })))
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
    onChanges: (changes) => dispatch(setEditingTask(new TaskModel(editingTask, changes))),
    onClose: close,
    onProcessWeekDay: processWeekDay,
    onCalendarCellClick: processCalendarClick,
    onCheckCalendarCellSelection: checkCalendarCellSelection
  }
}

export const EditTask = connect(
  mapStateToProps,
  null,
  mergeProps
)(EditTaskView)
