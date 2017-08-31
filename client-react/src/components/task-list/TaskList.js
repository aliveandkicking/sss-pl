import { connect } from 'react-redux'
import { TaskListView } from './TaskListView'

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { tasks } = stateProps

  return {
    tasks
  }
}

export const TaskList = connect(
  mapStateToProps,
  null,
  mergeProps
)(TaskListView)
