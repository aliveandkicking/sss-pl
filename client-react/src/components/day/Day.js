import { connect } from 'react-redux'
import { DayView } from './DayView'
import { dateUtils } from '../../shared/utils/dateutils'

const formatCaption = date => {
  return `${dateUtils.DAY_NAMES[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    title: formatCaption(ownProps.date),
    date: ownProps.date,
    tasks: Object.values(state.tasks).filter(task => task.containsDate(ownProps.date))
  }
}

export const Day = connect(
  mapStateToProps
)(DayView)
