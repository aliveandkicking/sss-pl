import { connect } from 'react-redux'
import { CommonRepeatRulesView } from './CommonRepeatRulesView'
// import {
//   changeTask,
//   setEditingTask,
//   setEditTaskShowingCustomDates
// } from '../../actions'
// import { TaskModel } from '../../shared/models/task-model'
// import { repeatMode } from '../../shared/immutable/repeat-modes';

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    onChanges: ownProps.onChanges,
    task: ownProps.task
  }
}

export const CommonRepeatRules = connect(
  mapStateToProps,
  null,
  mergeProps
)(CommonRepeatRulesView)
