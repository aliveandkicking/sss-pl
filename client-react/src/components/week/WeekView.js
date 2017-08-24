import React from 'react'
import { weekStyles } from './WeekStyle'
import { Day, WeekNavigationHeader } from '..'
import { dateUtils } from '../../shared/utils/dateutils'
import PropTypes from 'prop-types'

export const WeekView = ({initialDate}) => {
  const randerDays = () => {
    let result = []
    for (let i = 0; i < 7; i++) {
      result.push(<Day key={i} date={dateUtils.incDay(initialDate, i)} />)
    }
    return result
  }

  return (
    <div style={weekStyles.root} >
      <WeekNavigationHeader />
      <div style={weekStyles.body}>
        {randerDays()}
      </div>
    </div>
  )
}

WeekView.propTypes = {
  initialDate: PropTypes.object
}
