import React from 'react';
import { editTaskStyles } from './EditTaskStyle';
import { Calendar } from '..';
import { repeatMode } from '../../shared/immutable/repeat-modes';
import { dateUtils } from '../../shared/utils/dateutils';

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
      <div>
        <span onClick={e => onClose(true)}>
          {'Save'}
        </span>
        <span onClick={e => onClose()}>
          {'Cancel'}
        </span>
      </div>
    )
  }

  const getTabs = () => {
    const tabs = []
    repeatMode.all.forEach((info)  => {
      tabs.push(
        <span
          key={info.id}
          style={editTaskStyles.tab}
          onClick={e => {onChanges({repeatModeId: info.id})}}>
          {info.title}
        </span>
    )})
    return tabs
  }

  const getNoRepeatRules = () => {
    return (
      <div>
        <label htmlFor='date-input'>
          {'Date:'}
        </label>
        <input
          id="date-input"
          type="date"
          value={dateUtils.toISOString(task.startDate)}
          onChange={(e) => {
            onChanges({startDate: dateUtils.fromISOString(e.target.value)})
          }}
          />
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
            ? editTaskStyles.selectedDayOfWeek
            : editTaskStyles.dayOfWeek
          }
          onClick={(e) => {
            onChanges({weeklyDays: onProcessWeekDay(task.weeklyDays, day)})}
          }>
          {dateUtils.DAY_NAMES[day]}
        </span>
      )
    })
    return (
      <div key='week-days'>
        <label>
          {'Repeat on:'}
        </label>
        <div>
          {days}
        </div>
      </div>
    )
  }

  const getMonthlyCustomRules = () => {
    return (
      <div key='monthly-custom-rules'>
        <span
          style={
            !task.monthlyDayOfTheLastWeek
            ? editTaskStyles.monthlyDayOfTheLastWeekSelected
            : null
          }
          onClick={(e) => {
            if (task.monthlyDayOfTheLastWeek) {
              onChanges({monthlyDayOfTheLastWeek: false})}
            }
          }
        >
          {'Day of Month'}
        </span>
        <span
          style={
            task.monthlyDayOfTheLastWeek
            ? editTaskStyles.monthlyDayOfTheLastWeekSelected
            : null
          }
          onClick={e => {
            if (!task.monthlyDayOfTheLastWeek) {
              onChanges({monthlyDayOfTheLastWeek: true})}
          }}
        >
          {'Day of the last week'}
        </span>
      </div>
    )
  }

  const getCommonRepeatRules = () => {
    return (
      <div key='common-repeat-rules'>
        <div>
          <label htmlFor="repeat-every-control">
            Repeat every:
          </label>
          <input
            id="repeat-every-control"
            type="number"
            min="1"
            max="30"
            onChange={e => onChanges({ every: e.target.value})}
            value={task.every}/>
        </div>

        <div>
          <label htmlFor="start-date-control">
            Starts on:
          </label>
          <input
            id="start-date-control"
            type="date"
            value={dateUtils.toISOString(task.startDate)}
            onChange={e => {
              onChanges({startDate: dateUtils.fromISOString(e.target.value)})
            }}
          />
        </div>

        <div>
          <label htmlFor="end-date-control">
            Ends on:
          </label>
          <input
            id="end-date-control"
            type="date"
            value={dateUtils.toISOString(task.endDate)}
            onChange={e => {
              onChanges({endDate: dateUtils.fromISOString(e.target.value)})
            }}
          />
          <input
            id="never-end-checkbox"
            type="checkbox"
            checked={task.neverEnd}
            onChange={e => {
              onChanges({neverEnd: e.target.checked})
            }}
          />
          <label htmlFor="never-end-checkbox">
            never
          </label>
        </div>
      </div>
    )
    
  }

  const getRules = () => {
    // once
    if (task.repeatModeId === repeatMode.once.id) {
      return getNoRepeatRules()
    }
    //repeat
    const rules = []
    if (task.repeatModeId === repeatMode.weekly.id) {
      rules.push(getWeeklyCustomRules())
    } else if (task.repeatModeId === repeatMode.monthly.id) {
      rules.push(getMonthlyCustomRules())
    }
    rules.push(getCommonRepeatRules())
    return rules
  }

  return (
    <div
      style={editTaskStyles.root}
      onClick={e => onClose()}>
      <div style={editTaskStyles.dialog}
        onClick={e => {e.stopPropagation()}}>
        <div>
          {getHeader()}
          <div>
            <input
              type="text"
              defaultValue={task.name}
              onChange={e => onChanges({ name: e.target.value})}
            />
            <div style={editTaskStyles.tabs}>
              {getTabs()}
            </div>
            <div>
              {getRules()}
            </div>
            <div>
              <Calendar
                onCellClick={onCalendarCellClick}
                onCheckCellSelection={onCheckCalendarCellSelection}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
