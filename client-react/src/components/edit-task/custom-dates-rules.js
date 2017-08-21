import React from 'react'
import { editTaskStyles as styles } from './EditTaskStyle'
import {  CustomSpan } from '..'

export const getCustomDatesRules = (skipDates, includeDates, onShowingCustomDatesChange) => {

  const getShortDateStr = dateTime => {
    const date = new Date(dateTime)
    return (date.getMonth() + 1) + '-' + date.getDate()
  }

  const datesToShow = 3

  const placeHolder = 'Manage'

  const getCustomDatesText = () => {
    let text = ''
    let processed = 0
    for (let i = 0; (i < skipDates.length) && (processed < datesToShow); i++) {
      text += `, ${getShortDateStr(skipDates[i])}[S]`
      processed++
    }
    for (let i = 0; (i < includeDates.length) && (processed < datesToShow); i++) {
      text += `, ${getShortDateStr(includeDates[i])}[I]`
      processed++
    }
    if (!text) {
      text = placeHolder
    } else {
      text = text.substr(2) +
        ((includeDates.length + skipDates.length) > datesToShow ? ' ...' : '')
    }
    return text
  }

  return (
    <div
      key='custom-dates-rules'
      style={styles.customDatesRule}>
      {'Custom Dates: '}
      <CustomSpan
        style={styles.caption}
        styleHover={styles.captionHover}
        title={'Manage custom dates'}
        onClick={e => onShowingCustomDatesChange(true)}>
        {getCustomDatesText()}
      </CustomSpan>
    </div>
  )
}