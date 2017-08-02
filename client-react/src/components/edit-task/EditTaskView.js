import React from 'react';
import { editTaskStyles } from './EditTaskStyle';
import { Calendar } from '..';
import { repeatMode } from '../../shared/immutable/repeat-modes';
import { dateUtils } from '../../shared/utils/dateutils';

export const EditTaskView = ({
  activeMode,
  visible,
  taskModel,
  onChangeTab,
  onClose,
  onModelChanges
}) => {
  if (!visible) {
    return null
  }

  const getTabs = () => {
    const tabs = []
    repeatMode.all.forEach((info)  => {
      tabs.push(
        <span
          key={info.id}
          style={editTaskStyles.tab}
          onClick={e => {onChangeTab(info.id)}}>
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
          defaultValue={dateUtils.toISOString(taskModel.startDate)}
          onChange={(e) => {
            onModelChanges({startDate: dateUtils.fromISOString(e.target.value)})
          }}
          />
      </div>
    )
  }

  const processWeekDay = (day) => {
    const result = Array.from(taskModel.weeklyDays)
    const index = result.indexOf(day)
    if (index >= 0) {
      result.splice(index, 1)
    } else {
      result.push(day)
    }
    return result
  }

  const getWeeklyCustomRules = () => {
    const days = []
    dateUtils.DAYS_OF_WEEK_MONDAY_BASED.forEach((day) => {
      days.push(
        <span
          key={day}
          style={
            taskModel.weeklyDays.includes(day)
            ? editTaskStyles.selectedDayOfWeek
            : editTaskStyles.dayOfWeek
          }
          onClick={(e) => {
            onModelChanges({weeklyDays: processWeekDay(day)})}
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
            !taskModel.monthlyDayOfTheLastWeek
            ? editTaskStyles.monthlyDayOfTheLastWeekSelected
            : null
          }
          onClick={(e) => {
            if (taskModel.monthlyDayOfTheLastWeek) {
              onModelChanges({monthlyDayOfTheLastWeek: false})}
            }
          }
        >
          {'Day of Month'}
        </span>
        <span
          style={
            taskModel.monthlyDayOfTheLastWeek
            ? editTaskStyles.monthlyDayOfTheLastWeekSelected
            : null
          }
          onClick={(e) => {
            if (!taskModel.monthlyDayOfTheLastWeek) {
              onModelChanges({monthlyDayOfTheLastWeek: true})}
            }
          }
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
            onChange={(e) => {
              onModelChanges({ every: e.target.value})
            }}
            defaultValue="1"/>
        </div>

        <div>
          <label htmlFor="start-date-control">
            Starts on:
          </label>
          <input
            id="start-date-control"
            type="date"
            defaultValue={dateUtils.toISOString(taskModel.startDate)}
            onChange={(e) => {
              onModelChanges({startDate: dateUtils.fromISOString(e.target.value)})
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
            defaultValue={dateUtils.toISOString(taskModel.endDate)}
            onChange={(e) => {
              onModelChanges({endDate: dateUtils.fromISOString(e.target.value)})
            }}
          />
          <input
            id="never-end-checkbox"
            type="checkbox"
            checked={taskModel.neverEnd}
            onChange={(e) => {
              console.dir(e.target)
              onModelChanges({neverEnd: e.target.checked})
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
    if (activeMode === repeatMode.once.id) {
      return getNoRepeatRules()
    }
    //repeat
    const rules = []
    if (activeMode === repeatMode.weekly.id) {
      rules.push(getWeeklyCustomRules())
    } else if (activeMode === repeatMode.monthly.id) {
      rules.push(getMonthlyCustomRules())
    }
    rules.push(getCommonRepeatRules())
    return rules
  }

  return (
    <div
      style={editTaskStyles.root}
      onClick={e => {
        e.preventDefault()
        onClose()
      }}>
      <div style={editTaskStyles.dialog}
        onClick={e => {e.stopPropagation()}}>
        <div>

          <div>
            header
          </div>

          <div>
            <input
              type="text"
              defaultValue={taskModel.name}
              onChange={(e) => {
                onModelChanges({ name: e.target.value})
              }}
            />
            <div style={editTaskStyles.tabs}>
              {getTabs()}
            </div>
            <div>
              {getRules()}
            </div>
            <div>
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}