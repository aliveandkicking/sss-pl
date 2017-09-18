import React from 'react'
import { editTaskStyles as styles } from './EditTaskStyle'
import { Calendar, CustomSpan } from '..'
import { repeatMode } from '../../core'
import { EditCustomDates } from './edit-custom-dates/EditCustomDates'
import { getCommonRepeatRules } from './common-repeat-rules'
import { getWeeklyRepeatRules } from './weekly-repeat-rules'
import { getMonthlyRepeatRules } from './monthly-repeat-rules'
import { getNoRepeatRules } from './no-repeat-rules'
import { getCustomDatesRules } from './custom-dates-rules'
import PropTypes from 'prop-types'

export const EditTaskView = ({
  task,
  predefinedNames,
  predefinedTags,
  showingCustomDates,
  onClose,
  onChanges,
  onDelete,
  onCalendarCellClick,
  onProcessWeekDay,
  onCheckCalendarCellSelection,
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

  const getNameRow = () => {
    return (
      <span style={styles.nameInputContainer}>
        <datalist id='predefined-names'>
          {predefinedNames.map(name => <option key={name} value={name} />)}
        </datalist>
        <input
          style={styles.nameInput}
          list='predefined-names'
          type='text'
          autoFocus
          onFocus={e => {
            if (!task.id) {
              e.target.select()
            }
          }}
          defaultValue={task.name}
          onChange={e => e.target.value ? onChanges({name: e.target.value}) : null}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              onClose(true)
            }
          }}
        />
        <span style={styles.timesPerDaySymbol}>
          &times;
        </span>
        <input style={styles.timesPerDayInput}
          id='repeat-per-day'
          type='number'
          min='1'
          max='10'
          onChange={e => e.target.value && onChanges({
            timesPerDay: parseInt(e.target.value, 10)
          })}
          value={task.timesPerDay} />
      </span>
    )
  }

  const getTabs = () => {
    const tabs = []
    repeatMode.all.forEach((info) => {
      tabs.push(
        <span
          key={info.id}
          style={info.id === task.repeatModeId ? styles.tabSelected : styles.tab}
          onClick={e => { onChanges({repeatModeId: info.id}) }}>
          {info.title}
        </span>
      )
    })
    return (
      <div
        key='repeat-mpdes-tabs'
        style={styles.tabs}>
        {tabs}
      </div>
    )
  }

  const getRepeatRules = () => {
    const rules = []
    // once
    if (task.repeatModeId === repeatMode.once.id) {
      rules.push(getNoRepeatRules(task.startDate, onChanges))
    } else {
    // repeat
      if (task.repeatModeId === repeatMode.weekly.id) {
        rules.push(getWeeklyRepeatRules(task.weeklyDays, onProcessWeekDay, onChanges))
      } else if (task.repeatModeId === repeatMode.monthly.id) {
        rules.push(getMonthlyRepeatRules(task.monthlyDayOfTheLastWeek, onChanges))
      }
      rules.push(getCommonRepeatRules(task, onChanges))
    }
    return (
      <div
        key='repeat-mode'
        style={styles.rules}>
        {rules}
      </div>
    )
  }

  const getRules = () => {
    if (!showingCustomDates) {
      return [
        getTabs(),
        getRepeatRules(),
        getCustomDatesRules(task.skipDates, task.includeDates, onShowingCustomDatesChange)
      ]
    } else {
      return <EditCustomDates
        skipDates={task.skipDates}
        includeDates={task.includeDates}
        onDeleteDate={(skip, data) => {
          if (skip) {
            onChanges({skipDates: task.skipDates.filter(el => el !== data)})
          } else {
            onChanges({includeDates: task.includeDates.filter(el => el !== data)})
          }
        }}
        onHide={e => onShowingCustomDatesChange(false)}
      />
    }
  }

  const getFooter = () => {
    return (
      <div style={styles.footer}>
        <datalist id='predefined-tags'>
          {predefinedTags.map(name => <option key={name} value={name} />)}
        </datalist>
        <input
          style={styles.tagInput}
          list='predefined-tags'
          type='text'
          placeholder='Tags'
          defaultValue={task.tag}
          onChange={e => onChanges({tag: e.target.value.trim()})} />
        {task.id &&
          <CustomSpan
            style={styles.deleteButton}
            styleHover={styles.deleteButtonHover}
            onClick={e => {
              if (window.confirm('Delete task permanently ?')) {
                onDelete()
              }
            }}>
            Delete &#10006;
          </CustomSpan>
        }
      </div>
    )
  }

  return (
    <div
      style={styles.root}
      onClick={e => onClose()}>
      <div
        style={styles.dialog}
        onClick={e => { e.stopPropagation() }}>
        {getHeader()}
        {getNameRow()}
        {getRules()}
        <Calendar
          onCellClick={onCalendarCellClick}
          onCheckCellSelection={onCheckCalendarCellSelection}
        />
        {getFooter()}
      </div>
    </div>
  )
}

EditTaskView.propTypes = {
  task: PropTypes.object,
  onClose: PropTypes.func,
  onChanges: PropTypes.func,
  onDelete: PropTypes.func,
  onCalendarCellClick: PropTypes.func,
  onProcessWeekDay: PropTypes.func,
  onCheckCalendarCellSelection: PropTypes.func,
  onShowingCustomDatesChange: PropTypes.func,
  showingCustomDates: PropTypes.bool,
  predefinedNames: PropTypes.array,
  predefinedTags: PropTypes.array
}
