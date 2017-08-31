import { connect } from 'react-redux'
import { NavigationHeaderView } from './NavigationHeaderView'
import { setInitialDate } from '../../actions'
import { dateUtils } from '../../core/dateutils'

const buildDateCaption = date => {
  const startDateData = dateUtils.decodeDate(date)
  const endDateData = dateUtils.decodeDate(dateUtils.incDay(date, dateUtils.DAYS_IN_WEEK - 1))
  let result = ''

  if (startDateData[1] === endDateData[1]) {
    result = ` ${dateUtils.MONTH_NAMES[startDateData[1]]} ${startDateData[2]} - ${endDateData[2]}, `
  } else {
    result = ` ${dateUtils.MONTH_NAMES[startDateData[1]]} ${startDateData[2]} -  ${dateUtils.MONTH_NAMES[endDateData[1]]} ${endDateData[2]}, `
  }
  result += startDateData[0] !== endDateData[0] ? startDateData[0] + ' - ' + endDateData[0] : startDateData[0]
  return result
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialDate: dateUtils.getStartOfWeek(state.initialDate)
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { initialDate } = stateProps

  return {
    dateCaption: buildDateCaption(initialDate),
    onNext: () => dispatch(setInitialDate(dateUtils.incDay(initialDate, dateUtils.DAYS_IN_WEEK))),
    onPrev: () => dispatch(setInitialDate(dateUtils.decDay(initialDate, dateUtils.DAYS_IN_WEEK))),
    onToday: () => dispatch(setInitialDate(dateUtils.getStartOfWeek(new Date()))),
  }
}

export const WeekNavigationHeader = connect(
  mapStateToProps,
  null,
  mergeProps
)(NavigationHeaderView)
