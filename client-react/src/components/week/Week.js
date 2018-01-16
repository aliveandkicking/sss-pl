import { connect } from 'react-redux'
import { WeekView } from './WeekView'
import {
  dateUtils,
  goalHelper
} from '../../core'

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
    initialDate: dateUtils.getStartOfWeek(state.initialDate)
  }
}

export const Week = connect(
  mapStateToProps
)(WeekView)
