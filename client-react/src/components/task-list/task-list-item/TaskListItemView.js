import React from 'react'
import { taskListItemStyles as styles } from './TaskListItemStyle'
import { stringToColor, repeatMode, dateUtils } from '../../../core'
import PropTypes from 'prop-types'
import { CustomSpan } from '../..'

export const TaskListItemView = ({ task, onEdit, isValid }) => {
  const getRootStyle = () => {
    const color = stringToColor.getColor(task.name)
    return Object.assign({}, styles.root, { backgroundColor: color })
  }

  const getInfoText = () => {
    let result
    if (task.repeatModeId === repeatMode.once.id) {
      result = `${repeatMode.once.title} -
      ${dateUtils.toISOString(task.startDate)}`
    } else {
      const repatModeName = repeatMode.all[task.repeatModeId].title
      result = `${repatModeName} (every ${task.every + repatModeName.charAt(0)} ) `
      result += `from ${dateUtils.toISOString(task.startDate)} `
      result += `to ${dateUtils.toISOString(task.endDate)}`
    }
    return result
  }

  return (
    <CustomSpan
      style={getRootStyle()}
      styleHover={styles.rootHover}
      onClick={e => onEdit()}>
      <div style={styles.content}>
        <div style={styles.name}>
          {task.name}
        </div>
        <div style={styles.info}>
          {getInfoText()}
        </div>
      </div>

      <div style={styles.markersConstainer}>
        <span
          style={Object.assign({},
            styles.marker,
            isValid ? styles.markerInactiveActive : null
          )}
          title={isValid ? 'Valid' : 'Invalid'}>
          &#9432;
        </span>
      </div>
    </CustomSpan>
  )
}

TaskListItemView.propTypes = {
  task: PropTypes.object,
  onEdit: PropTypes.func,
  isValid: PropTypes.bool
}
