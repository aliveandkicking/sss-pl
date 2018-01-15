import { connect } from 'react-redux'
import { GoalView } from './GoalView'
import {
  changeGoal,
  addGoal,
  deleteGoal,
  changeGoalTree
} from '../../../actions'
import { goalHelper } from '../../../core'

const mapStateToProps = (state, ownProps) => {
  const { goal } = ownProps
  return {
    goals: state.goals,
    goalsTree: state.goalsTree
  }
}

const getChildrenIds = (goals, goalId) => {
  return goals.reduce((result, goal) => {
    if (goal.parentId === goalId) {
      result.push(goal.id)
      result.push(...getChildrenIds(goals, goal.id))
    }
    return result
  }, [])
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { goal } = ownProps
  const { goals, goalsTree } = stateProps

  const getChangeVisibilityCallback = (idListName, currentValue) => {
    return () => {
      const newValue = goalsTree[idListName] || []
      const ids = [goal.id, ...getChildrenIds(goals, goal.id)]
      dispatch(changeGoalTree({[idListName]: currentValue
        ? newValue.filter(id => {
          return !ids.includes(id)
        })
        : newValue.reduce((result, currId) => {
          if (!result.includes(currId)) {
            result.push(currId)
          }
        }, ids)
      }))
    }
  }

  const tasksHidden = goalsTree.withHiddenTasks &&
    goalsTree.withHiddenTasks.includes(goal.id)
  const completeSubgoalsHidden = goalsTree.withHiddenComplete &&
    goalsTree.withHiddenComplete.includes(goal.id)
  const pendingSubgoalsHidden = goalsTree.withHiddenPending &&
    goalsTree.withHiddenPending.includes(goal.id)

  return {
    goal,
    tasksHidden,
    completeSubgoalsHidden,
    pendingSubgoalsHidden,
    onChange: (changes) => dispatch(changeGoal(goal.id, changes)),
    onChangeTasksVisibility:
      getChangeVisibilityCallback('withHiddenTasks', tasksHidden),
    onChangeCompleteSubgoalsVisibility:
      getChangeVisibilityCallback('withHiddenComplete', completeSubgoalsHidden),
    onChangePendingSubgoalsVisibility:
      getChangeVisibilityCallback('withHiddenPending', pendingSubgoalsHidden),
    onAddSub: () => {
      dispatch(addGoal(goalHelper.create({
        id: goals.reduce((maxId, currGoal) => Math.max(maxId, currGoal.id), 1) + 1,
        parentId: goal.id
      })))
    },
    onDelete: () => dispatch(deleteGoal(goal.id))
  }
}

export const Goal = connect(
  mapStateToProps,
  null,
  mergeProps
)(GoalView)

