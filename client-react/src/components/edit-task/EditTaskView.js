import React from 'react';
import { editTaskStyles as styles } from './EditTaskStyle';
import { Calendar } from '..';
import { repeatMode } from '../../shared/immutable/repeat-modes'
import { dateUtils } from '../../shared/utils/dateutils'
import { CustomSpan } from '..';

export const EditTaskView = ({
  task,
  onClose,
  onChanges,
  onCalendarCellClick,
  onProcessWeekDay,
  onCheckCalendarCellSelection
}) => {
  if (!task) {
    return null
  }

  const getHeader = () => {
    return (
      <div style={styles.header}>
        <CustomSpan
          style={styles.caption}
          styleHover={styles.captionHover}
          onClick={e => onClose(true)}>
          {'Save'}
        </CustomSpan>
        <CustomSpan
          style={styles.caption}
          styleHover={styles.captionHover}
          onClick={e => onClose()}>
          {'Cancel'}
        </CustomSpan>
      </div>
    )
  }

  const getTabs = () => {
    const tabs = []
    repeatMode.all.forEach((info)  => {
      tabs.push(
        <span
          key={info.id}
          style={info.id === task.repeatModeId ? styles.tabSelected : styles.tab}
          onClick={e => {onChanges({repeatModeId: info.id})}}>
          {info.title}
        </span>
    )})
    return <div style={styles.tabs}>{tabs}</div>
  }

  const getNoRepeatRules = () => {
    return (
      <div style={styles.ruleRow}>
        <label
          style={styles.ruleLabel}
          htmlFor='date-input'
          key={task.repeatModeId}>
          {'Date:'}
        </label>
        <input
          id="date-input"
          type="date"
          style={styles.ruleInput}
          value={dateUtils.toISOString(task.startDate)}
          onChange={(e) => {
            onChanges({startDate: dateUtils.fromISOString(e.target.value)})
          }}/>
      </div>
    )
  }

  const getWeeklyCustomRules = () => {
    const days = []
    dateUtils.DAYS_OF_WEEK_MONDAY_BASED.forEach((day) => {
      days.push(
        <span
          key={day}
          style={
            task.weeklyDays.includes(day)
            ? styles.selectedDayOfWeek
            : styles.dayOfWeek
          }
          onClick={(e) => {
            onChanges({weeklyDays: onProcessWeekDay(task.weeklyDays, day)})}
          }>
          {dateUtils.DAY_NAMES[day]}
        </span>
      )
    })
    return (
      <div
        style={styles.ruleRow}
        key='week-days'>
        <label style={styles.ruleLabel}>
          {'Repeat on:'}
        </label>
        <span style={styles.ruleInput}>
          {days}
        </span>
      </div>
    )
  }

  const getMonthlyCustomRules = () => {
    return (
      <div
        style={styles.ruleRow}
        key='monthly-custom-rules'>
        <span
          style={
            !task.monthlyDayOfTheLastWeek
            ? styles.monthlyDayOfTheLastWeekSelected
            : null
          }
          onClick={(e) => {
            if (task.monthlyDayOfTheLastWeek) {
              onChanges({monthlyDayOfTheLastWeek: false})}
            }
          }>
          {'Day of Month'}
        </span>
        <span
          style={
            task.monthlyDayOfTheLastWeek
            ? styles.monthlyDayOfTheLastWeekSelected
            : null
          }
          onClick={e => {
            if (!task.monthlyDayOfTheLastWeek) {
              onChanges({monthlyDayOfTheLastWeek: true})}
          }}>
          {'Day of the last week'}
        </span>
      </div>
    )
  }

  const getCommonRepeatRules = () => {
    const result = []
    result.push(
      <div
        style={styles.ruleRow}
        key={'repeat-every'}>
        <label
          style={styles.ruleLabel}
          htmlFor="repeat-every-control">
          Repeat every:
        </label>
        <input
          id="repeat-every-control"
          style={styles.ruleInput}
          type="number"
          min="1"
          max="30"
          onChange={e => onChanges({ every: e.target.value})}
          value={task.every}/>
      </div>
    )
    result.push(
      <div
        style={styles.ruleRow}
        key={'start-date'}>
        <label
          style={styles.ruleLabel}
          htmlFor="start-date-control">
          Starts on:
        </label>
        <input
          id="start-date-control"
          style={styles.ruleInput}
          type="date"
          value={dateUtils.toISOString(task.startDate)}
          onChange={e => {
            onChanges({startDate: dateUtils.fromISOString(e.target.value)})
          }}/>
      </div>
    )
    result.push(
      <div
        style={styles.ruleRow}
        key={'end-date'}>
        <label
          style={styles.ruleLabel}
          htmlFor="end-date-control">
          Ends on:
        </label>
        <input
          id="end-date-control"
          style={styles.ruleInput}
          type="date"
          value={dateUtils.toISOString(task.endDate)}
          onChange={e => {
            onChanges({endDate: dateUtils.fromISOString(e.target.value)})
          }}/>
        <label htmlFor="never-end-checkbox">
          <input
            id="never-end-checkbox"
            type="checkbox"
            checked={task.neverEnd}
            onChange={e => {
              onChanges({neverEnd: e.target.checked})
            }}
          />
          never
        </label>
      </div>
    )
    return result
  }

  const getRules = () => {
    // once
    const rules = []
    if (task.repeatModeId === repeatMode.once.id) {
      rules.push(getNoRepeatRules())
    } else {
    //repeat
      if (task.repeatModeId === repeatMode.weekly.id) {
        rules.push(getWeeklyCustomRules())
      } else if (task.repeatModeId === repeatMode.monthly.id) {
        rules.push(getMonthlyCustomRules())
      }
      rules.push(getCommonRepeatRules())
    }
    return(
      <div style={styles.rules}>
        {rules}
      </div>
    )
  }

  return (
    <div
      style={styles.root}
      onClick={e => onClose()}>
      <div
        style={styles.dialog}
        onClick={e => {e.stopPropagation()}}>
        {getHeader()}
        <input
          style={styles.nameInput}
          type="text"
          defaultValue={task.name}
          onChange={e => onChanges({ name: e.target.value})}
        />
        {getTabs()}
        {getRules()}
        <Calendar
          onCellClick={onCalendarCellClick}
          onCheckCellSelection={onCheckCalendarCellSelection}
        />
      </div>
    </div>
  )
}
