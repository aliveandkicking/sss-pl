import { connect } from 'react-redux'
import { TaskView } from './TaskView'
import {
  addDoneTask,
  removeDoneTask,
  setEditingTask
} from '../../actions'
import { dateUtils } from '../../shared/utils/dateutils'
import { TaskModel } from '../../shared/models/task-model'

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
  return {
    isDone: state.doneTasks[dateStr]
      ? state.doneTasks[dateStr].includes(ownProps.task.id)
      : false
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { isDone } = stateProps

  return {
    task: ownProps.task,
    taskNameAbbreviation: getTaskNameAbbreviation(ownProps.task.name),
    isMarked: isDone,
    onClick: () => {
      if (isDone) {
        dispatch(removeDoneTask(ownProps.date, ownProps.task.id))
      } else {
        dispatch(addDoneTask(ownProps.date, ownProps.task.id))
      }
    },
    onEdit: () => dispatch(setEditingTask(new TaskModel(ownProps.task)))
  }
}

export const Task = connect(
  mapStateToProps,
  null,
  mergeProps
)(TaskView)