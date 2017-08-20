import React from 'react'
import { commonRepeatRulesStyles as styles } from './CommonRepeatRulesStyle'
import { dateUtils } from '../../../shared/utils/dateutils'

export const CommonRepeatRulesView = ({
  onChanges,
  task
}) => {

  const getRepeatEveryRule = () => {
    return (
      <div style={styles.ruleRow}>
        <label
          style={styles.ruleLabel}
          htmlFor='repeat-every-control'>
          Repeat every:
        </label>
        <span style={styles.ruleInput}>
          <input
            id='repeat-every-control'
            type='number'
            min='1'
            max='30'
            onChange={e => onChanges({ every: e.target.value})}
            value={task.every} />
        </span>
      </div>
    )
  }

  const getStartDateRule = () => {
    return (
      <div style={styles.ruleRow}>
        <label
          style={styles.ruleLabel}
          htmlFor='start-date-control'>
          Starts on:
        </label>
        <input
          id='start-date-control'
          style={styles.ruleInput}
          type='date'
          value={dateUtils.toISOString(task.startDate)}
          onChange={e => {
            onChanges({startDate: dateUtils.fromISOString(e.target.value)})
          }} />
      </div>
    )
  }

  const getEndDateRule = () => {
    return (
      <div style={styles.ruleRow}>
        <label
          style={styles.ruleLabel}
          htmlFor='end-date-control'>
          Ends on:
        </label>
        <input
          id='end-date-control'
          style={styles.ruleInput}
          type='date'
          disabled={task.neverEnd}
          value={dateUtils.toISOString(task.endDate)}
          onChange={e => {
            onChanges({endDate: dateUtils.fromISOString(e.target.value)})
          }} />
        <label htmlFor='never-end-checkbox'>
          <input
            id='never-end-checkbox'
            type='checkbox'
            checked={task.neverEnd}
            onChange={e => {
              onChanges({neverEnd: e.target.checked})
            }}
          />
          never
        </label>
      </div>
    )
  }

  return (
    <div style={styles.root}>
      {getRepeatEveryRule()}
      {getStartDateRule()}
      {getEndDateRule()}
    </div>
  )
}
