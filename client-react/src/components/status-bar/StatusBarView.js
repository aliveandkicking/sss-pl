import React from 'react'
import { statusBarStyles as styles } from './StatusBarStyles'
import PropTypes from 'prop-types'

export const StatusBarView = ({text}) => {
  return (
    <div style={styles.root}>
      <span style={styles.statusLabel}>
        {text}
      </span>
    </div>
  )
}

StatusBarView.propTypes = {
  text: PropTypes.string
}
