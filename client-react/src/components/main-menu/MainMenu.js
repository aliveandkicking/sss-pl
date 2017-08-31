import { connect } from 'react-redux'
import { MainMenuView } from './MainMenuView'
import { TaskModel } from '../../core/task-model'
import {
  setMainMenuExpandedState,
  setEditingTask,
  setTaskListVisibility
} from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    expanded: state.mainMenuExpanded,
    taskListVisible: state.taskListVisible,
    editingTask:  state.editTask.task
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { expanded, taskListVisible, editingTask } = stateProps

  return {
    expanded,
    onChangeExpandedState: expand => dispatch(setMainMenuExpandedState(expand)),
    onNewTask: () => {
      if (!editingTask) {
        dispatch(setEditingTask(new TaskModel()))
      }
    },
    onShowTaskList: () => {
      if (!taskListVisible) {
        dispatch(setTaskListVisibility(true))
      }
    },
    onShowWeek: () => {
      if (taskListVisible) {
        dispatch(setTaskListVisibility(false))
      }
    }
  }
}

export const MainMenu = connect(
  mapStateToProps,
  null,
  mergeProps
)(MainMenuView)
