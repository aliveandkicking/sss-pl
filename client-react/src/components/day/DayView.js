import React from 'react';
import { dayStyles } from './DayStyle';
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
    <div style={dayStyles.root}>
      {title}
      {randerTasks()}
    </div>
  )
}

