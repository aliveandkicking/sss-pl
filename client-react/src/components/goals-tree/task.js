import React from 'react'
import { goalsTreeStyles as styles } from './GoalsTreeStyle'

export const renderTask = (task) => {
  return (
    <div style={styles.task}>
      {task.getNameAbbreviation()}
    </div>
  )
}