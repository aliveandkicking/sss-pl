import React from 'react'
import { dayStyles as styles } from './DayStyle'
import { Task } from '../task/Task'
import { CustomSpan } from '..'
import PropTypes from 'prop-types'

export const DayView = ({
  caption,
  tasks,
  date,
  addTask,
  dropTask
}) => {
  const randerTasks = () => {
    return tasks.map(task =>
      <Task
        key={task.id}
        task={task}
        date={date}
      />
    )
  }

  return (
    <div
      style={styles.root}
      onDragOver={e => {
        e.preventDefault()
        if (e.ctrlKey) {
          e.dataTransfer.dropEffect = 'copy';
        }
      }}
      onDrop={e => {
        e.preventDefault()
        try {
          const dropedData = JSON.parse(e.dataTransfer.getData('text/plain'))
          console.log(dropedData)
          dropTask(dropedData.id, dropedData.date, e.ctrlKey)
        } catch (error) {
          console(error)
        }
      }}>
      <div style={styles.caption}>
        {caption}
      </div>
      <div style={styles.content}>
        {randerTasks()}
        <span style={styles.addTaskRow}>
          <CustomSpan
            style={styles.addTaskButton}
            styleHover={styles.addTaskButtonHover}
            onClick={e => addTask(null)}>
            +
          </CustomSpan>
        </span>
      </div>
    </div>
  )
}

DayView.propTypes = {
  caption: PropTypes.string,
  tasks: PropTypes.array,
  date: PropTypes.object,
  addTask: PropTypes.func
}
