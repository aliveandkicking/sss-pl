import { connect } from 'react-redux'
import { CalendarView } from './CalendarView'
import { dateUtils } from '../../core'
import {
  setEditTaskCalendarInitialDate,
  setEditTaskCalendarMonthMode
} from '../../actions'

const numberOfWeeks = 7
const monthsInRow = 4

const getWeeks = (date, onCheckCellSelection) => {
  const weeks = [dateUtils.DAYS_OF_WEEK_MONDAY_BASED.map(day => {
    return {
      data: day,
      text: dateUtils.DAY_NAMES[day],
      isWeekDay: true,
      selected: onCheckCellSelection(day, true)
    }
  })]

  let startOfWeek = dateUtils.getStartOfWeek(dateUtils.getStartOfMonth(date))
  for (let j = 0; j < numberOfWeeks; j++) {
    let week = []
    for (let i = 0; i < dateUtils.DAYS_IN_WEEK; i++) {
      let day = dateUtils.incDay(startOfWeek, i)
      week.push({
        data: day,
        text: day.getDate(),
        selected: onCheckCellSelection(day),
        siblingLeftover: date.getMonth() !== day.getMonth()
      })
    }
    weeks.push(week)
    startOfWeek = dateUtils.incDay(startOfWeek, dateUtils.DAYS_IN_WEEK)
  }
  return weeks
}

const getMonths = () => {
  const months = []
  for (let j = 0; j < dateUtils.MONTH_IN_YEAR / monthsInRow; j++) {
    let row = []
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
  return months
}

const getTitle = (monthMode, date) => {
  return monthMode
     ? date.getFullYear().toString()
     : `${dateUtils.MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`
}

const mapStateToProps = (state, ownProps) => {
  return {
    monthMode: state.editTask.calendarMonthMode,
    initialDate: state.editTask.calendarInitialDate
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { monthMode, initialDate } = stateProps

  return {
    rows: monthMode ? getMonths() : getWeeks(initialDate, ownProps.onCheckCellSelection),
    title: getTitle(monthMode, initialDate),
    onClick: ownProps.onClick,
    onNext: () => {
      dispatch(setEditTaskCalendarInitialDate(
        monthMode
          ? dateUtils.incYear(initialDate)
          : dateUtils.incMonth(initialDate)
      ))
    },
    onPrev: () => {
      dispatch(setEditTaskCalendarInitialDate(
        monthMode
          ? dateUtils.decYear(initialDate)
          : dateUtils.decMonth(initialDate)
     ))
    },
    onTitleClick: () =>
      dispatch(setEditTaskCalendarMonthMode(!monthMode)),
    onTodayClick: () => {
      dispatch(setEditTaskCalendarMonthMode(false))
      dispatch(setEditTaskCalendarInitialDate(new Date()))
    },
    onCellClick: cell => {
      if (cell.isMonth) {
        dispatch(setEditTaskCalendarInitialDate(
          new Date(initialDate.getFullYear(), cell.data, 1)))
        dispatch(setEditTaskCalendarMonthMode(false))
      } else if (ownProps.onCellClick) {
        ownProps.onCellClick(cell)
      }
    }
  }
}

export const Calendar = connect(
  mapStateToProps,
  null,
  mergeProps
)(CalendarView)
