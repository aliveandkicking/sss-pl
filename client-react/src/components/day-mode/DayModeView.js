import React from 'react'
import { dayModeStyles as styles } from './DayModeStyle'
import {
  Day,
  DayNavigationHeader,
  Vocabulary
} from '..'
import { dateUtils } from '../../core'
import PropTypes from 'prop-types'

function getRandomIndex (length) {
  return Math.floor(Math.random() * length)
}

function getVocabularyContent (date) {
  const result = []
  const startOfWeel = dateUtils.getStartOfWeek(date)
  const todayTime = dateUtils.clearTime(date).getTime()

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
          {currVocabItem}
          <div style={styles.vocabularyDate}>
            {dateUtils.toISOString(currDate)}
          </div>
        </div>
      )
    }
  }
  return result
}

export class DayModeView extends React.Component {

  state = {popupIndex: 0}

  render () {
    const {date, popups} = this.props

    setTimeout(() => {
      this.setState({popupIndex: getRandomIndex(popups.length)})
    }, 300000);

    return (
      <div style={styles.root} >
        <DayNavigationHeader />
  
        <div style={styles.content}>
          <Day
            date={date}
            hideCaption
            largeTasks
          />
  
          <div style={styles.additionalInfo}>
            <div style={styles.vocabularyContainer}>
              {getVocabularyContent(date)}
              <div
                style={styles.popup}
                onClick={() => this.setState({popupIndex: getRandomIndex(popups.length)})}
              >
                {popups[this.state.popupIndex]}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DayModeView.propTypes = {
  initialDate: PropTypes.object,
  currentGoals: PropTypes.array,
  popups: PropTypes.array,
  date: PropTypes.object
}
