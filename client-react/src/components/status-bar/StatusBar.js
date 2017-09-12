import { connect } from 'react-redux'
import { StatusBarView } from './StatusBarView'

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.statusText
  }
}

export const StatusBar = connect(mapStateToProps)(StatusBarView)