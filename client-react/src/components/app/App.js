import React from 'react'
import { Week } from '..'
import { EditTask } from '..'
import { theme } from '../styles';

const style = {
  background: `linear-gradient(-30deg, ${theme.colorC}, ${theme.colorE})`,
  fontFamily: theme.fontFamily,
  color: theme.colorText,
  height: '100%',
  minWidth: '575px'
}

const App = () => {
  return (
    <div style={style}>
      <EditTask />
      <Week />
    </div>
  )
}

export default App;
