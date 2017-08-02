import { navigationHeaderStyles as styles } from './NavigationHeaderStyle';
import React from 'react';

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
        <span
          style={styles.todayButton}
          onClick={e => {
            e.preventDefault()
            onToday()
          }}>
          Today
        </span>

        <span
          style={styles.button}
          onClick={e => {
            e.preventDefault()
            onPrev()
          }}>
          prev
        </span>

        <span
          style={styles.button}
          onClick={e => {
            e.preventDefault()
            onNext()
          }}>
          next
        </span>
      </span>

    </div>
  )
}