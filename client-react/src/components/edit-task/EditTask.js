import { connect } from 'react-redux'
import { EditTaskView } from './EditTaskView'
import { changeTask, setEditingTaskId } from '../../actions'
import { TaskModel } from '../../shared/models/task-model'
import { state } from '../../store'


const mapStateToProps = (state, ownProps) => {
  return {
    taskModel: state.editTask.taskId ? state.tasks[state.editTask.taskId] : null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onModelChanges: (changes) => {
      const task = state().tasks[state().editTask.taskId]
      dispatch(changeTask({task: new TaskModel(task, changes)}))
    },
    onClose: () => dispatch(setEditingTaskId({id: null}))
  }
}

export const EditTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTaskView)
