import React from 'react'
import { taskListStyles as styles } from './TaskListStyle'
import PropTypes from 'prop-types'
import { TaskListItem } from './task-list-item/TaskListItem'

export const TaskListView = ({tasks}) => {
  return (
    <div style={styles.root}>
      {Object.keys(tasks).map(key => <TaskListItem taskId={key} key={key} />)}
    </div>
  )
}

TaskListView.propTypes = {
  tasks: PropTypes.object
}
