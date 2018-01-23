import React from 'react'
import { dayModeStyles as styles } from './DayModeStyle'
import {
  Day,
  DayNavigationHeader
  // Vocabulary
} from '..'
import { dateUtils } from '../../core'
import PropTypes from 'prop-types'

export const DayModeView = ({date, currentGoals}) => {

  return (
    <div style={styles.root} >
      <DayNavigationHeader />
      <div style={styles.body}>
        <Day date={date} />
      </div>

      <div style={styles.vocabularyBlockContainer}>
        {/*
          dateUtils.DAYS_OF_WEEK.map(
            (dayName, index) => (
              <div
                key={index}
                style={styles.vocabularyItemContainer}
              >
                <Vocabulary
                  date={dateUtils.incDay(initialDate, index)}
                  compactMode
                />
              </div>
            )
          )
        */}
      </div>

      <div style={styles.footer}>
        {/*
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
          */}
      </div>
    </div>
  )
}

DayModeView.propTypes = {
  initialDate: PropTypes.object,
  currentGoals: PropTypes.array
}
