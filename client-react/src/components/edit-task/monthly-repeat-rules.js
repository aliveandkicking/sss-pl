import React from 'react'
import { editTaskStyles as styles } from './EditTaskStyle'

export const getMonthlyRepeatRules = (monthlyDayOfTheLastWeek, onChanges) => {
  const getOption = (value, caption) => {
    return (
      <span
        style={Object.assign({}, styles.monthlyDayOfTheLastWeek,
          !(monthlyDayOfTheLastWeek ^ value)
            ? styles.monthlyDayOfTheLastWeekSelected
            : null
        )}
        onClick={e => {
          (monthlyDayOfTheLastWeek ^ value) && onChanges({monthlyDayOfTheLastWeek: value})
        }}>
        {caption}
      </span>
    )
  }

  return (
    <div
      style={Object.assign({}, styles.ruleRow, styles.monthlyRuleRow)}
      key='monthly-custom-rules'>
      {getOption(false, 'Day of Month')}
      {getOption(true, 'Day of the last week')}
    </div>
  )
}
