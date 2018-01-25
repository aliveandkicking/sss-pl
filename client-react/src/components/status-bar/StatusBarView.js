import React from 'react'
import { statusBarStyles as styles } from './StatusBarStyles'
import PropTypes from 'prop-types'

export const StatusBarView = ({text, currentGoals}) => {
  return (
    <div style={styles.root}>
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
      <span style={styles.statusLabel}>
        {text}
      </span>
    </div>
  )
}

StatusBarView.propTypes = {
  text: PropTypes.string,
  currentGoals: PropTypes.string
}
