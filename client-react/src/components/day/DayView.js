import React from 'react'
import { dayStyles as styles } from './DayStyle'
import { Task } from '../task/Task'
import { CustomSpan } from '..'


export const DayView = ({title, tasks, date, addTask}) => {
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
    <div style={styles.root}>
      <div style={styles.caption}>
        {title}
      </div>
      <div style={styles.content}>
        {randerTasks()}
        <span style={styles.addTaskRow}>
          <CustomSpan
            style={styles.addTaskButton}
            styleHover={styles.addTaskButtonHover}
            onClick={addTask}>
            +
          </CustomSpan>
        </span>
      </div>
    </div>
  )
}
