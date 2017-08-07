import { connect } from 'react-redux'
import { DayView } from './DayView'

const mapStateToProps = (state, ownProps) => {
  return {
    date: ownProps.date
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { }
}

export const Day = connect(
  mapStateToProps,
  mapDispatchToProps
)(DayView)
