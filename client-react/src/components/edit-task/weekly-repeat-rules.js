import React from 'react'
import { editTaskStyles as styles } from './EditTaskStyle'
import { dateUtils } from '../../core/dateutils'
import { CustomSpan } from '..'

export const getWeeklyRepeatRules = (
  weeklyDays,
  onProcessWeekDay,
  onChanges
) => {
  const days = []

  const getDay = (day) => {
    days.push(
      <span
        key={day}
        style={Object.assign({}, styles.dayOfWeek,
          weeklyDays.includes(day)
          ? styles.dayOfWeekSelected
          : null)
        }
        onClick={e => onChanges({weeklyDays: onProcessWeekDay(weeklyDays, day)})}>
        {dateUtils.DAY_NAMES[day]}
      </span>
    )
    return days
  }

  dateUtils.DAYS_OF_WEEK_MONDAY_BASED.forEach(getDay)
  return (
    <div
      key={'weekly-rule'}
      style={styles.ruleRow}>
      <label style={styles.ruleLabel}>
        {'Repeat on:'}
      </label>
      <span style={styles.ruleInput}>
        {days}
      </span>
      <CustomSpan
        style={styles.dayOfWeekRangeButtonMonToFri}
        styleHover={styles.dayOfWeekRangeButtonHover}
        title={'Monday to Friday'}
        onClick={e => onChanges({weeklyDays: Array.from(dateUtils.MO_FR)})}>
        M
      </CustomSpan>
      <CustomSpan
        style={styles.dayOfWeekRangeButtonSaSu}
        styleHover={styles.dayOfWeekRangeButtonHover}
        title={'Weekend'}
        onClick={e => onChanges({weeklyDays: Array.from(dateUtils.SA_SU)})}>
        W
      </CustomSpan>
    </div>
  )
}
