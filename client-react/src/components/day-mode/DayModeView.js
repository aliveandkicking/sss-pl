import React from 'react'
import { dayModeStyles as styles } from './DayModeStyle'
import {
  Day,
  DayNavigationHeader,
  Vocabulary
} from '..'
import { dateUtils } from '../../core'
import PropTypes from 'prop-types'

function getVocabularyContent (date) {
  const result = []
  const startOfWeel = dateUtils.getStartOfWeek(date)

  for (let index = 0; index < dateUtils.DAYS_IN_WEEK; index++) {
    result.push(
      <div
        key={'vocab-containter-' + index}
        style={styles.vocabularyItemContainer}
      >
        <Vocabulary
          date={dateUtils.incDay(startOfWeel, index)}
        />
      </div>
    )
  }
  return result
}

export const DayModeView = ({date, currentGoals}) => {

  return (
    <div style={styles.root} >
      <DayNavigationHeader />

      <div style={styles.content}>
        <Day date={date} />

        <div style={styles.additionalInfo}>
          <div style={styles.vocabularyContainer}>
            {getVocabularyContent(date)}
          </div>
          <div style={styles.notesContainer}>

          </div>
        </div>
      </div>

    </div>
  )
}

DayModeView.propTypes = {
  initialDate: PropTypes.object,
  currentGoals: PropTypes.array
}
