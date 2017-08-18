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
  onCheckCalendarCellSelection,
  showingCustomDates,
  onShowingCustomDatesChange
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
      <div
        style={styles.ruleRow}
        key={task.repeatModeId}>
        <label
          style={styles.ruleLabel}
          htmlFor='date-input'>
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
    const getDay = (day) => {
      days.push(
        <span
          key={day}
          style={Object.assign({}, styles.dayOfWeek,
            task.weeklyDays.includes(day)
            ? styles.dayOfWeekSelected
            : null)
          }
          onClick={e => onChanges({weeklyDays: onProcessWeekDay(task.weeklyDays, day)})}>
          {dateUtils.DAY_NAMES[day]}
        </span>
      )
      return days
    }
    dateUtils.DAYS_OF_WEEK_MONDAY_BASED.forEach(getDay)
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

  const getMonthlyCustomRules = () => {
    const getOption = (value, caption) => {
      return (
        <span
          style={Object.assign({}, styles.monthlyDayOfTheLastWeek,
            !(task.monthlyDayOfTheLastWeek ^ value)
              ? styles.monthlyDayOfTheLastWeekSelected
              : null
          )}
          onClick={e => {if (task.monthlyDayOfTheLastWeek ^ value) {
            onChanges({monthlyDayOfTheLastWeek: value})}
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


  const getCustomDatesRule = () => {

    const getShortDateStr = dateTime => {
      const date = new Date(dateTime)
      return (date.getMonth() + 1) + '/' + date.getDate()
    }

    const datesToShow = 3

    const getCustomDatesText = () => {
      let text = ''
      let processed = 0
      for (let i = 0; (i < task.skipDates.length) && (processed < datesToShow); i++) {
        text += `, ${getShortDateStr(task.skipDates[i])}[S]`
        processed++
      }
      for (let i = 0; (i < task.includeDates.length) && (processed < datesToShow); i++) {
        text += `, ${getShortDateStr(task.includeDates[i])}[I]`
        processed++
      }
      if (!text) {
        text = 'Manage'
      } else {
        text = text.substr(2) +
          ((task.includeDates.length + task.skipDates.length) > datesToShow ? ' ...' : '')
      }
      return text
    }

    return (
      <div
        style={styles.ruleRow}
        key='custom-dates'>
        <label style={styles.ruleLabel}>
          {'CustomDates:'}
        </label>
        <CustomSpan
          style={Object.assign({}, styles.caption, styles.customDatesRuleText)}
          styleHover={styles.captionHover}
          title={'Manage custom dates'}
          onClick={e => onChanges({weeklyDays: Array.from(dateUtils.MO_FR)})}>
          {getCustomDatesText()}
        </CustomSpan>
      </div>
    )
  }

  const getRepeatEveryRule = () => {
    return (
      <div
        style={styles.ruleRow}
        key={'repeat-every'}>
        <label
          style={styles.ruleLabel}
          htmlFor="repeat-every-control">
          Repeat every:
        </label>
        <span style={styles.ruleInput}>
          <input
            id="repeat-every-control"
            type="number"
            min="1"
            max="30"
            onChange={e => onChanges({ every: e.target.value})}
            value={task.every}/>
        </span>
      </div>
    )
  }

  const getStartDateRule = () => {
    return (
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
  }

  const getEndDateRule = () => {
    return (
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
          disabled={task.neverEnd}
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
  }

  const getCommonRepeatRules = () => {
    return [
      getRepeatEveryRule(),
      getStartDateRule(),
      getEndDateRule()
    ]
  }

  const getCustomDatesRules = () => {
    return (
      <div
        key={'custom-dates'}>

      </div>
    )
  }

  const getRules = () => {
    const rules = []
    if (!showingCustomDates) {
      // once
      if (task.repeatModeId === repeatMode.once.id) {
        rules.push(getNoRepeatRules())
      } else {
      // repeat
        if (task.repeatModeId === repeatMode.weekly.id) {
          rules.push(getWeeklyCustomRules())
        } else if (task.repeatModeId === repeatMode.monthly.id) {
          rules.push(getMonthlyCustomRules())
        }
        rules.push(getCommonRepeatRules())
      }
      rules.push(getCustomDatesRule())
    } else {
      rules.push(getCustomDatesRules())
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
          autoFocus={true}
          onFocus={e => {if (!task.id) {
            e.target.select()
          }}}
          defaultValue={task.name}
          onChange={e => onChanges({ name: e.target.value})}
          onKeyDown={e => {if (e.keyCode === 13) {
            onClose(true)
          }}}
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
