import React from 'react';
import { dayStyles as styles } from './DayStyle';
import { Task } from '../task/Task';


export const DayView = ({title, tasks, date}) => {
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
      </div>
    </div>
  )
}

