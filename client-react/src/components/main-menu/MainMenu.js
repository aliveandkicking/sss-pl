import { connect } from 'react-redux'
import { MainMenuView } from './MainMenuView'
import { TaskModel, pages } from '../../core'
import {
  setMainMenuExpandedState,
  setEditingTask,
  setPageId
} from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    expanded: state.mainMenuExpanded,
    pageId: state.pageId,
    editingTask: state.editTask.task
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { expanded, pageId, editingTask } = stateProps

  return {
    expanded,
    onChangeExpandedState: expand => dispatch(setMainMenuExpandedState(expand)),
    onNewTask: () => {
      if (!editingTask) {
        dispatch(setEditingTask(new TaskModel()))
      }
    },
    onShowTaskList: () => {
      if (pageId !== pages.taskList.id) {
        dispatch(setPageId(pages.taskList.id))
      }
    },
    onShowWeek: () => {
      if (pageId !== pages.weekTasks.id) {
        dispatch(setPageId(pages.weekTasks.id))
      }
    },
    onShowGoalsTree: () => {
      if (pageId !== pages.goalsTree.id) {
        dispatch(setPageId(pages.goalsTree.id))
      }
    },
    onShowDay: () => {
      if (pageId !== pages.dayTasks.id) {
        dispatch(setPageId(pages.dayTasks.id))
      }
    }
  }
}

export const MainMenu = connect(
  mapStateToProps,
  null,
  mergeProps
)(MainMenuView)
