import { connect } from 'react-redux'
import { InfiniteScrollView } from './InfiniteScrollView'

function mapStateToProps (state) {
  return {
    windowWidth: state.windowSize.width
  }
}

export const InfiniteScroll = connect(
  mapStateToProps
)(InfiniteScrollView)
