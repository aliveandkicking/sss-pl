import { connect } from 'react-redux'
import { StatusBarView } from './StatusBarView'
import { goalHelper } from '../../core'

const getCurrentGoals = (subGoals) => {
  return subGoals.reduce((result, goalNodeIter) => {
    if (goalNodeIter.subGoals.length > 0) {
      const children = getCurrentGoals(goalNodeIter.subGoals)
      if (children.length > 0) {
        result.push(...children)
      }
    } else if (goalNodeIter.goal.inProgress && !goalNodeIter.goal.complete) {
      result.push(goalNodeIter.goal)
    }
    return result
  }, [])
}

const mapStateToProps = (state, ownProps) => {
  const goalTree = goalHelper.buildGoalsTree(state.goals, state.tasks)
  const currentGoals = getCurrentGoals(goalTree.subGoals)
  return {
    currentGoals: currentGoals,
    text: state.statusText
  }
}

export const StatusBar = connect(mapStateToProps)(StatusBarView)
