import React from 'react';
import { weekStyles } from './WeekStyle';
import { Day } from '..';
import { WeekNavigationHeader } from '..';
import { dateUtils } from '../../shared/utils/dateutils';

export const WeekView = ({initialDate}) => {
  const randerDays = () => {
    let result = []
    for (let i = 0; i < 7; i++) {
       result.push(<Day key={i} date={dateUtils.incDay(initialDate, i)}/>)
    }
    return result
  }

  return (
    <div style={weekStyles.root} >
      <div style={weekStyles.header}>
        <WeekNavigationHeader />
      </div>
      <div style={weekStyles.content}>
        {randerDays()}
      </div>
    </div>
  )
}

