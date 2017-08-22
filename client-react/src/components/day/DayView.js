import React from 'react'
import { dayStyles as styles } from './DayStyle'
import { Task } from '../task/Task'
import { CustomSpan } from '..'


export const DayView = ({caption, tasks, date, addTask}) => {
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
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault()
        addTask(e.dataTransfer.getData('text/plain'))
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
