import React from 'react';
import { dayStyles } from './DayStyle';
import { Task } from '../task/Task';
import { tasks } from '../../store'
import { dateUtils } from '../../shared/utils/dateutils';

export const DayView = ({date}) => {
  const randerTasks = () => {
    let result = []
    Object.values(tasks()).forEach((task) => {
      if (task.containsDate(date)) {
        result.push(<Task key={task.id} task={task} date={date}/>)
      }
    })
    return result
  }

  return (
    <div style={dayStyles.root}>
      {dateUtils.toISOString(date)}
      {randerTasks()}
    </div>
  )
}