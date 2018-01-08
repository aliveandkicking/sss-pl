import { connect } from 'react-redux'
import { GoalsTreeView } from './GoalsTreeView'
import { setWindowSize } from '../../actions'

const mapStateToProps = (state, ownProps) => {

  // const goalTree = {id: 0, name: 'root', children: null}

  state.goals.reduce((accum, goal) => {
    console.log(accum)
    if (goal.parentId === 0) {
      accum.push(goal)
    }
    return accum
  }, [])

  return {
    goals: state.goals
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onResize: width => dispatch(setWindowSize(width))
  }
}

export const GoalsTree = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalsTreeView)

