import { navigationHeaderStyles as styles } from './NavigationHeaderStyle'
import React from 'react'
import { CustomSpan } from '..'
import PropTypes from 'prop-types'

export const NavigationHeaderView = ({onAdd, onNext, onPrev, onToday, dateCaption}) => {
  return (
    <div style={styles.root}>
      <CustomSpan
        style={styles.button}
        styleHover={styles.buttonHover}
        onClick={e => {
          e.preventDefault()
          onAdd()
        }}>
        <span style={styles.addButtonSymbol}>
          +
        </span>
      </CustomSpan>

      <span style={styles.dateCaption}>
        {dateCaption}
      </span>

      <span style={styles.rightButtonGroupContainer}>
        <CustomSpan
          style={styles.todayButton}
          styleHover={styles.buttonHover}
          onClick={e => {
            e.preventDefault()
            onToday()
          }}>
          Today
        </CustomSpan>

        <CustomSpan
          style={styles.button}
          styleHover={styles.buttonHover}
          onClick={e => {
            e.preventDefault()
            onPrev()
          }}>
          <span style={styles.navigationButtonSymbol}>
            {'<'}
          </span>
        </CustomSpan>

        <CustomSpan
          style={styles.button}
          styleHover={styles.buttonHover}
          onClick={e => {
            e.preventDefault()
            onNext()
          }}>
          <span style={styles.navigationButtonSymbol}>
            {'>'}
          </span>
        </CustomSpan>
      </span>

    </div>
  )
}

NavigationHeaderView.propTypes = {
  onAdd: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onToday: PropTypes.func,
  dateCaption: PropTypes.string
}
