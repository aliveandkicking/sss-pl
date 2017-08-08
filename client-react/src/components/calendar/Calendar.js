import { connect } from 'react-redux'
import { CalendarView } from './CalendarView'
import { dateUtils } from '../../shared/utils/dateutils';
import { state } from '../../store';
import {
  setEditTaskCalendarInitialDate,
  setEditTaskCalendarMonthMode
} from '../../actions';

const numberOfWeeks = 7;
const monthsInRow = 4;

const getWeeks = (date) => {
  const weeks = [dateUtils.DAYS_OF_WEEK_MONDAY_BASED.map(day => {
    return {
      data: day,
      text: dateUtils.DAY_NAMES[day],
      isDayName: true
    }
  })]

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
      row.push({
        data: monthIndex,
        text: dateUtils.MONTH_NAMES_SHORT[monthIndex],
        isMonth: true
      })
    }
    months.push(row)
  }
  return months;
}

const getTitle = (date) => {
  return state().editTask.calendarMonthMode
     ? date.getFullYear()
     : `${dateUtils.MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`
}

const mapStateToProps = (state, ownProps) => {
  return {
    rows: state.editTask.calendarMonthMode
      ? getMonths()
      : getWeeks(state.editTask.calendarInitialDate),
    title: getTitle(state.editTask.calendarInitialDate),
    onClick: ownProps.onClick
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNext: () => {
      dispatch(setEditTaskCalendarInitialDate(
        state().editTask.calendarMonthMode
          ? dateUtils.incYear(state().editTask.calendarInitialDate)
          : dateUtils.incMonth(state().editTask.calendarInitialDate))
    )},
    onPrev: () => {
      dispatch(setEditTaskCalendarInitialDate(
        state().editTask.calendarMonthMode
          ? dateUtils.decYear(state().editTask.calendarInitialDate)
          : dateUtils.decMonth(state().editTask.calendarInitialDate))
    )},
    onTitleClick: () =>
      dispatch(setEditTaskCalendarMonthMode(!state().editTask.calendarMonthMode)),
    onTodayClick: () => {
      dispatch(setEditTaskCalendarMonthMode(false))
      dispatch(setEditTaskCalendarInitialDate(new Date()))
    },
    onCellClick: cell => {
      if (cell.isMonth) {
        dispatch(setEditTaskCalendarInitialDate(
          new Date(state().editTask.calendarInitialDate.getFullYear(), cell.data, 1)))
        dispatch(setEditTaskCalendarMonthMode(false))
      } else
        if (ownProps.onCalendarCellClick) {
          ownProps.onCalendarCellClick(cell)
      }
    }
  }
}

export const Calendar = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarView)
