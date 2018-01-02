import { connect } from 'react-redux'
import { RootView } from './RootView'
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


export const Root = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootView)

