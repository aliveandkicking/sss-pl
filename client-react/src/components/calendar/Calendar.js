import { connect } from 'react-redux'
import { CalendarView } from './CalendarView'
import { dateUtils } from '../../shared/utils/dateutils';
import { state } from '../../store';
import {
  setEditTaskDialogCalendarInitialDate,
  setEditTaskDialogCalendarMonthMode
} from '../../actions';

const numberOfWeeks = 7;
const monthsInRow = 4;

const getWeeks = (date) => {
  const weeks = [];
  let startOfWeek = dateUtils.getStartOfWeek(dateUtils.getStartOfMonth(date))
  for (let j = 0; j < numberOfWeeks; j++) {
    let week = [];
    for (let i = 0; i < dateUtils.DAYS_IN_WEEK; i++) {
      let day = dateUtils.incDay(startOfWeek, i)
      week.push({data: day, text: day.getDate()})
    }
    weeks.push(week)
    startOfWeek = dateUtils.incDay(startOfWeek, dateUtils.DAYS_IN_WEEK)
  }
  return weeks;
}

const getMonths = () => {
  const months = [];
  for (let j = 0; j < dateUtils.MONTH_IN_YEAR/monthsInRow; j++) {
    let row = [];
    for (let i = 0; i < monthsInRow; i++) {
      let monthIndex = j * monthsInRow + i
      row.push({data: monthIndex, text: dateUtils.MONTH_NAMES_SHORT[monthIndex]})
    }
    months.push(row)
  }
  return months;
}

const getTitle = (date) => {
  return state().editTaskDialog.calendarMonthMode
     ? date.getFullYear()
     : `${dateUtils.MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`
}

const mapStateToProps = (state, ownProps) => {
  return {
    rows: state.editTaskDialog.calendarMonthMode
      ? getMonths()
      : getWeeks(state.editTaskDialog.calendarInitialDate),
    title: getTitle(state.editTaskDialog.calendarInitialDate),
    onClick: ownProps.onClick
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNext: () => {
      dispatch(setEditTaskDialogCalendarInitialDate(
        state().editTaskDialog.calendarMonthMode
          ? dateUtils.incYear(state().editTaskDialog.calendarInitialDate)
          : dateUtils.incMonth(state().editTaskDialog.calendarInitialDate))
    )},
    onPrev: () => {
      dispatch(setEditTaskDialogCalendarInitialDate(
        state().editTaskDialog.calendarMonthMode
          ? dateUtils.decYear(state().editTaskDialog.calendarInitialDate)
          : dateUtils.decMonth(state().editTaskDialog.calendarInitialDate))
    )},
    onTitleClick: () => {
      dispatch(setEditTaskDialogCalendarMonthMode(!state().editTaskDialog.calendarMonthMode))
    },
    onTodayClick: () => dispatch(setEditTaskDialogCalendarInitialDate(new Date()))
  }
}

export const Calendar = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarView)
