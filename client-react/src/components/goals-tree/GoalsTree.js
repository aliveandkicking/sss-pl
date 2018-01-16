import { connect } from 'react-redux'
import { GoalsTreeView } from './GoalsTreeView'
import {
  goalHelper,
  TaskModel
} from '../../core'
import {
  changeGoalTree,
  setEditingTask
} from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    goalsTree: goalHelper.buildGoalsTree(state.goals, state.tasks),
    goalTreeSettings: state.goalsTree
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChanges: changes => dispatch(changeGoalTree(changes)),
    onAddNewTask: (goalId) => dispatch(setEditingTask(new TaskModel({goalId}))),
    onEditTask: (task) => dispatch(setEditingTask(new TaskModel(task)))
  }
}

export const GoalsTree = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalsTreeView)

