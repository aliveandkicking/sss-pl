import React from 'react'
import { statusBarStyles as styles } from './StatusBarStyles'

export const StatusBarView = ({text}) => {
  return (
    <div style={styles.root}>
      <span style={styles.statusLabel}>
        {text}
      </span>
    </div>
  )
}