import React from 'react'
import { editTaskStyles as styles } from './EditTaskStyle'
import { dateUtils } from '../../shared/utils/dateutils'

export const getCommonRepeatRules = (
  task,
  onChanges
) => {

  const getRepeatEveryRule = () => {
    return (
      <div
        key={'repeat-every-rule'}
        style={styles.ruleRow}>
        <label
          style={styles.ruleLabel}
          htmlFor='repeat-every-control'>
          Repeat every:
        </label>
        <input style={styles.ruleInput}
          id='repeat-every-control'
          type='number'
          min='1'
          max='30'
          onChange={e => onChanges({every: e.target.value})}
          value={task.every} />
      </div>
    )
  }

  const getStartDateRule = () => {
    return (
      <div
        key={'start-date-rule'}
        style={styles.ruleRow}>
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
          onChange={e => {onChanges({startDate: e.target.value
              ? dateUtils.fromISOString(e.target.value)
              : dateUtils.clearTime(new Date())
            })
          }} />
      </div>
    )
  }

  const getEndDateRule = () => {
    return (
      <div
        key={'end-date-rule'}
        style={styles.ruleRow}>
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
            onChanges({endDate: e.target.value
              ? dateUtils.fromISOString(e.target.value)
              : dateUtils.clearTime(new Date())})
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

  return [
    getRepeatEveryRule(),
    getStartDateRule(),
    getEndDateRule()
  ]
}
