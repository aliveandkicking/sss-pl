import React from 'react'
import { Week, EditTask } from '..'
import { theme } from '../styles'

const style = {
  background: `linear-gradient(-30deg, ${theme.colorC}, ${theme.colorE})`,
  fontFamily: theme.fontFamily,
  color: theme.colorText,
  height: '100%',
  minWidth: '575px'
}

export const Root = () => {
  return (
    <div style={style}>
      <EditTask />
      <Week />
    </div>
  )
}
