import React from 'react'
import { statusBarStyles as styles } from './StatusBarStyles'
import PropTypes from 'prop-types'

export const StatusBarView = ({text, currentGoals}) => {
  const total = (new Date(2100, 6, 1)) - (new Date(1989, 5, 27))
  const progress = (new Date()) - (new Date(1989, 5, 27))
  const progressPerc = Math.round(progress * 100 * 100 / total) / 100

  return (
    <div style={styles.root}>
      <div style={styles.goalsContainer}>
        {
          currentGoals.map(goal => <div
            key={goal.id}
            style={styles.goal}
            >
            <div>
              {goal.name}
            </div>
            {
              goal.passive &&
              <div style={styles.goalLabel}>
                {'P'}
              </div>
            }
          </div>)
        }
      </div>
      <div style={styles.progressBarContainer}>
        <div style={styles.progressBarCaption}>
          {progressPerc + '%'}
        </div>
        <div style={{
          ...styles.progressBar,
          width: Math.round(progressPerc * 0.98 /* margins */) + '%'
        }} />
      </div>
      <span style={styles.statusLabel}>
        {text}
      </span>
    </div>
  )
}

StatusBarView.propTypes = {
  text: PropTypes.string,
  currentGoals: PropTypes.array
}
