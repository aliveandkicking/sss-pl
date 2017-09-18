import { connect } from 'react-redux'
import { RootView } from './RootView'

const mapStateToProps = (state, ownProps) => {
  return {
    pageId: state.pageId
  }
}

export const Root = connect(
  mapStateToProps
)(RootView)

