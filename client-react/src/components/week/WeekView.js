import React from 'react'
import { weekStyles as styles } from './WeekStyle'
import { Day, WeekNavigationHeader } from '..'
import { dateUtils } from '../../core'
import PropTypes from 'prop-types'

export const WeekView = ({initialDate, currentGoals}) => {
  const randerDays = () => {
    let result = []
    for (let i = 0; i < 7; i++) {
      result.push(<Day key={i} date={dateUtils.incDay(initialDate, i)} />)
    }
    return result
  }

  return (
    <div style={styles.root} >
      <WeekNavigationHeader />
      <div style={styles.body}>
        {randerDays()}
      </div>
      <div style={styles.footer}>
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
    </div>
  )
}

WeekView.propTypes = {
  initialDate: PropTypes.object,
  currentGoals: PropTypes.array
}
