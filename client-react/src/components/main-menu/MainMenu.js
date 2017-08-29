import { connect } from 'react-redux'
import { MainMenuView } from './MainMenuView'

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // const { dispatch } = dispatchProps
  // const { showTaskList } = stateProps

  return {
    visible: 1
  }
}

export const MainMenu = connect(
  mapStateToProps,
  null,
  mergeProps
)(MainMenuView)

