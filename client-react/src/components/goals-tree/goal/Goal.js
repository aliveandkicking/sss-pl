import { connect } from 'react-redux'
import { GoalView } from './GoalView'
import {
  changeGoal,
  addGoal,
  deleteGoal
} from '../../../actions'
import { goalHelper } from '../../../core'

const mapStateToProps = (state, ownProps) => {
  return {
    goals: state.goals
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { goal } = ownProps
  const { goals } = stateProps

  return {
    goal,
    onChange: (changes) => dispatch(changeGoal(goal.id, changes)),
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

