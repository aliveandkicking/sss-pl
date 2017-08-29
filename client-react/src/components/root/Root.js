import { connect } from 'react-redux'
import { RootView } from './RootView'


const mapStateToProps = (state, ownProps) => {
  return {
    showTaskList: true
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { showTaskList } = stateProps

  return {
    showTaskList
  }
}

export const Root = connect(
  mapStateToProps,
  null,
  mergeProps
)(RootView)

