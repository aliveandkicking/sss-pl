import { connect } from 'react-redux'
import { TaskView } from './TaskView'
import {
  changeDoneTask,
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
    doneInfo: doneInfo || [ownProps.task.id, 0, ownProps.task.timesPerDay]
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
      let newDoneInfo = Array.from(doneInfo)
      newDoneInfo[1] === newDoneInfo[2] ? --newDoneInfo[1] : ++newDoneInfo[1]
      dispatch(changeDoneTask(date, newDoneInfo))
    },
    onRemoveDoneTask: () => {
      if (doneInfo[1] > 0) {
        let newDoneInfo = [doneInfo[0], doneInfo[1] - 1, doneInfo[2]]
        dispatch(changeDoneTask(date, newDoneInfo))
      }
    },
    onChangeTimesPerDay: value => {
      let newDoneInfo = [doneInfo[0], doneInfo[1], doneInfo[2] + value]
      if (newDoneInfo[2] < 1) {
        newDoneInfo[2] = 1
      }
      if (newDoneInfo[2] < newDoneInfo[1]) {
        newDoneInfo[2] = newDoneInfo[1]
      }
      dispatch(changeDoneTask(date, newDoneInfo))
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
