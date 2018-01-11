import { connect } from 'react-redux'
import { GoalView } from './GoalView'
import { changeGoal } from '../../../actions'
// import { goalHelper } from '../../core'

const mapStateToProps = (state, ownProps) => {
  const {goal} = ownProps

  return {
    goal
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (changes) => dispatch(changeGoal(ownProps.goal.id, changes))
  }
}

export const Goal = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalView)

