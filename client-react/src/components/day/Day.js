import { connect } from 'react-redux'
import { DayView } from './DayView'
import { dateUtils } from '../../shared/utils/dateutils'

const mapStateToProps = (state, ownProps) => {
  return {
    title: dateUtils.toISOString(ownProps.date),
    date: ownProps.date,
    tasks: Object.values(state.tasks).filter(task => task.containsDate(ownProps.date))
  }
}

export const Day = connect(
  mapStateToProps
)(DayView)
