import React from 'react'
import { goalsTreeStyles as styles } from './GoalsTreeStyle'

export const renderGoal = (goal) => {
  return (
    <div style={styles.goal}>
      {goal.name}
    </div>
  )
}
