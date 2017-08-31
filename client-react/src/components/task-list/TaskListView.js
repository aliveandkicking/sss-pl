import React from 'react'
import { taskListStyles as styles } from './TaskListStyle'
import PropTypes from 'prop-types'
import { TaskListItem } from './task-list-item/TaskListItem'

export const TaskListView = ({tasks}) => {

  const getItems = () => {
    const result = []
    for (let key in tasks) {
      if (tasks.hasOwnProperty(key)) {
        result.push(<TaskListItem taskId={key} key={key}/>)
      }
    }
    return result
  }

  return (
    <div style={styles.root}>
      {getItems()}
    </div>
  )
}

TaskListView.propTypes = {
  tasks: PropTypes.object
}
