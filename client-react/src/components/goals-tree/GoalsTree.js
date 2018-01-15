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
  const rootTasks = []

  const processGoal = (goal) => {
    const result = {goal, subGoals: [], tasks: []}
    state.goals.forEach((currGoal) => {
      if (currGoal.parentId === goal.id) {
        result.subGoals.push(processGoal(currGoal))
      }
    })

    Object.values(state.tasks).forEach(task => {
      if (!task.goalId) {
        if (!rootTasks.find(taskIter => taskIter.id === task.id)) {
          rootTasks.push(task)
        }
      } else if (task.goalId === goal.id) {
        result.tasks.push(task)
      }
    })
    return result
  }

  const root = state.goals.find(goal => !goal.id)
  const goalsTree = processGoal(goalHelper.create(root))
  goalsTree.tasks.push(...rootTasks)

  return {
    goalsTree,
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

