import { connect } from 'react-redux'
import { DayModeView } from './DayModeView'
import { setWindowSize } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    pageId: state.pageId
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

