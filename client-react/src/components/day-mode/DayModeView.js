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
  const todayTime = dateUtils.today().getTime()

  let currDate
  let currVocabItem
  for (let index = 0; index < dateUtils.DAYS_IN_WEEK; index++) {
    currDate = dateUtils.clearTime(dateUtils.incDay(startOfWeel, index))
    currVocabItem = <Vocabulary date={dateUtils.incDay(startOfWeel, index)} />

    if (currVocabItem) {
      result.push(
        <div
          key={'vocab-containter-' + index}
          style={{
            ...styles.vocabularyItemContainer,
            ...(currDate.getTime() === todayTime
              ? styles.vocabularyItemContainerToday
              : null
            )
          }}
        >
          <div style={styles.vocabularyDate}>
            {dateUtils.toISOString(currDate)}
          </div>
          {currVocabItem}
        </div>
      )
    }
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
            {}
          </div>
        </div>
      </div>
    </div>
  )
}

DayModeView.propTypes = {
  initialDate: PropTypes.object,
  currentGoals: PropTypes.array,
  date: PropTypes.object
}
