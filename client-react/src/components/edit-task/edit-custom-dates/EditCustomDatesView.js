import React from 'react'
import { editCustomDatesStyles as styles } from './EditCustomDatesStyle'
import { dateUtils } from '../../../shared/utils/dateutils'
import { CustomSpan } from '../..'

export const EditCustomDatesView = ({
  skipDates,
  includeDates,
  onHide
}) => {
  const getDates = (dates) => {
    const result = []
    dates.forEach(data => {
      result.push(
        <span
          key={data}
          style={styles.customDate}>
          {dateUtils.toISOString(new Date(data))}
          <CustomSpan
            style={styles.deleteCustomDateButton}
            styleHover={styles.deleteCustomDateButtonHover}>
          x
          </CustomSpan>
        </span>
      )
    })
    return result
  }

  return (
    <div style={styles.root}>
      <CustomSpan
        style={styles.caption}
        styleHover={styles.captionHover}
        onClick={onHide}>
        {'< back'}
      </CustomSpan>
      Dates to skip
      <div style={styles.customDatesContainer}>
        {getDates(includeDates)}
      </div>
      Dates to include
      <div style={styles.customDatesContainer}>
        {getDates(skipDates)}
      </div>
    </div>
  )
}
