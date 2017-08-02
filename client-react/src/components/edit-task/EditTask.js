import { connect } from 'react-redux'
import { EditTaskView } from './EditTaskView'
import {
  setEditTaskDialogActiveMode,
  setEditTaskVisibility,
  modifyEditingTask
} from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    activeMode: state.editTaskDialog.activeMode,
    visible: state.editTaskDialog.visible,
    taskModel: state.editTaskDialog.taskModel
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onModelChanges: (modifications) => dispatch(modifyEditingTask(modifications)),
    onChangeTab: id => dispatch(setEditTaskDialogActiveMode(id)),
    onClose: () => {dispatch(setEditTaskVisibility(false))}
  }
}

export const EditTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTaskView)
