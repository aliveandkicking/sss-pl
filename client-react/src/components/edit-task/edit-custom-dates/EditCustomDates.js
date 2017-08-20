import { connect } from 'react-redux'
import { EditCustomDatesView } from './EditCustomDatesView'
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
    skipDates: ownProps.skipDates,
    includeDates: ownProps.includeDates,
    onHide: ownProps.onHide
  }
}

export const EditCustomDates = connect(
  mapStateToProps,
  null,
  mergeProps
)(EditCustomDatesView)
