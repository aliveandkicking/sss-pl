import { navigationHeaderStyles as styles } from './NavigationHeaderStyle'
import React from 'react';
import { CustomSpan } from '..';

export const NavigationHeaderView = ({onAdd, onNext, onPrev, onToday, dateCaption}) => {
  return (
    <div style={styles.root}>
      <span
        style={styles.button}
        onClick={e => {
          e.preventDefault()
          onAdd()
        }}>
        +
      </span>

      <span>
        {dateCaption}
      </span>

      <span style={styles.rightButtonGroupContainer}>
        <CustomSpan
          style={styles.todayButton}
          styleHover={styles.todayButtonHover}
          onClick={e => {
            e.preventDefault()
            onToday()
          }}>
          Today
        </CustomSpan>

        <span
          style={styles.button}
          onClick={e => {
            e.preventDefault()
            onPrev()
          }}>
          {'<'}
        </span>

        <span
          style={styles.button}
          onClick={e => {
            e.preventDefault()
            onNext()
          }}>
          {'>'}
        </span>
      </span>

    </div>
  )
}