import React from 'react'
// import {
// } from '..'
import { dayModeStyles as styles } from './DayModeStyle'
// import PropTypes from 'prop-types'

export class DayModeView extends React.Component {
  render () {
    return (
      <div style={styles.root}>
        <div style={styles.content}>
          {'day mode'}
        </div>
      </div>
    )
  }
}

DayModeView.propTypes = {
  // pageId: PropTypes.number.isRequired
}
