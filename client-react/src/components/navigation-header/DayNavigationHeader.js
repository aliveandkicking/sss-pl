import { connect } from 'react-redux'
import { NavigationHeaderView } from './NavigationHeaderView'
import { setInitialDate } from '../../actions'
import { dateUtils } from '../../core'

const buildDateCaption = date => {
  const dateData = dateUtils.decodeDate(date)
  return `${dateUtils.DAY_NAMES[date.getDay()]}. ${dateUtils.MONTH_NAMES[dateData[1]]} ${dateData[2]}, ${dateData[0]}`
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialDate: state.initialDate
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { initialDate } = stateProps

  return {
    dateCaption: buildDateCaption(initialDate),
    onNext: () => dispatch(setInitialDate(dateUtils.incDay(initialDate))),
    onPrev: () => dispatch(setInitialDate(dateUtils.decDay(initialDate))),
    onToday: () => dispatch(setInitialDate(dateUtils.today()))
  }
}

export const DayNavigationHeader = connect(
  mapStateToProps,
  null,
  mergeProps
)(NavigationHeaderView)
