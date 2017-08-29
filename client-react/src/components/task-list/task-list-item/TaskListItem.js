import { connect } from 'react-redux'
import { TaskListItemView } from './TaskListItemView'

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.tasks[ownProps.taskId]
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { task } = stateProps

  return {
    task
  }
}

export const TaskListItem = connect(
  mapStateToProps,
  null,
  mergeProps
)(TaskListItemView)
