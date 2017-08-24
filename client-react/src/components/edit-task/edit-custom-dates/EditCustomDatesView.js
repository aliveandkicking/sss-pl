import React from 'react'
import { editCustomDatesStyles as styles } from './EditCustomDatesStyle'
import { dateUtils } from '../../../shared/utils/dateutils'
import { CustomSpan } from '../..'
import PropTypes from 'prop-types'

export const EditCustomDatesView = ({
  skipDates,
  includeDates,
  onHide,
  onDeleteDate
}) => {
  const getDates = (skip) => {
    const dates = skip ? skipDates : includeDates
    const result = []
    dates.forEach(data => {
      const date = new Date(data)
      result.push(
        <span
          key={data}
          style={styles.customDate}>
          {dateUtils.toISOString(date, '/')}
          <span style={styles.customDateDayName}>
            {dateUtils.DAY_NAMES[date.getDay()]}
          </span>
          <CustomSpan
            style={styles.deleteCustomDateButton}
            styleHover={styles.deleteCustomDateButtonHover}
            onClick={e => onDeleteDate(skip, data)}>
            <div style={styles.deleteCustomDateButtonSymbol}>
              X
            </div>
          </CustomSpan>
        </span>
      )
    })
    return result
  }

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <CustomSpan
          style={styles.backButton}
          styleHover={styles.backButtonHover}
          onClick={onHide}>
          <div style={styles.backButtonSymbol}>
            {'<'}
          </div>
          {'Back'}
        </CustomSpan>
      </div>
      Dates to include:
      <div style={styles.customDatesContainer}>
        {getDates(false)}
      </div>
      Dates to skip:
      <div style={styles.customDatesContainer}>
        {getDates(true)}
      </div>
    </div>
  )
}

EditCustomDatesView.propTypes = {
  skipDates: PropTypes.array,
  includeDates: PropTypes.array,
  onHide: PropTypes.func,
  onDeleteDate: PropTypes.func
}
