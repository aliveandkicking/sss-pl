import { connect } from 'react-redux'
import { TaskView } from './TaskView'
import {
  addDoneTask,
  removeDoneTask,
  setEditingTask,
  changeTask
} from '../../actions'
import { dateUtils } from '../../core/dateutils'
import { TaskModel } from '../../core/task-model'

const getTaskNameAbbreviation = name => {
  let result = ''
  let words = name.split(' ')
  if (words.length === 1) {
    words = name.split('.')
  }

  if (words.length > 1) {
    for (let i = 0; (i < words.length) && (i < 3); i++) {
      if (words[i]) {
        result += (result ? '.' : '') + words[i].charAt(0)
      }
    }
    if (result) {
      return result.toUpperCase()
    }
  }

  result = name.charAt(0).toUpperCase()
  if (name.length > 1) {
    result += name.charAt(1)
  }
  return result
}

const mapStateToProps = (state, ownProps) => {
  const dateStr = dateUtils.toISOString(ownProps.date)
  const doneInfo = state.doneTasks[dateStr] && state.doneTasks[dateStr]
    .find(info => (info[0] === ownProps.task.id))
  return {
    doneInfo: doneInfo || [ownProps.task.id,0,1]
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { doneInfo } = stateProps
  const { date, task } = ownProps

  return {
    task,
    taskNameAbbreviation: getTaskNameAbbreviation(task.name),
    doneInfo,
    date,
    onClick: () => {
      if (doneInfo[1] === doneInfo[2]) {
        dispatch(removeDoneTask(date, task.id, task.timesPerDay))
      } else {
        dispatch(addDoneTask(date, task.id, task.timesPerDay))
      }
    },
    onEdit: () => dispatch(setEditingTask(new TaskModel(task))),
    onDelete: () => {
      const newTask = new TaskModel(task)
      const dateTime = date.getTime()
      if (newTask.includeDates.includes(dateTime)) {
        newTask.includeDates = newTask.includeDates.filter(el => el !== dateTime)
      }
      if (!newTask.containsDate(date)) {
        dispatch(changeTask(new TaskModel(newTask)))
      } else {
        dispatch(changeTask(new TaskModel(newTask).addSkipDate(date)))
      }
    }
  }
}

export const Task = connect(
  mapStateToProps,
  null,
  mergeProps
)(TaskView)
