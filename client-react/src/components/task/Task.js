import { connect } from 'react-redux'
import { TaskView } from './TaskView'
import {
  addDoneTask,
  removeDoneTask,
  setEditingTask
} from '../../actions'
import { dateUtils } from '../../shared/utils/dateutils'
import { TaskModel } from '../../shared/models/task-model'

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