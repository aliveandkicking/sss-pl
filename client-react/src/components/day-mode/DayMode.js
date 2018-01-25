import { connect } from 'react-redux'
import { DayModeView } from './DayModeView'
import { setWindowSize } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    popups: state.popups,
    date: state.initialDate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onResize: width => dispatch(setWindowSize(width))
  }
}

export const DayMode = connect(
  mapStateToProps,
  mapDispatchToProps
)(DayModeView)

