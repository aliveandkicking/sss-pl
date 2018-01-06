import { connect } from 'react-redux'
import { GoalsTreeView } from './GoalsTreeView'
import { setWindowSize } from '../../actions'

const mapStateToProps = (state, ownProps) => {
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

