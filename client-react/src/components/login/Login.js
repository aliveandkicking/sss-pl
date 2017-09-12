import React from 'react'
import { loginStyles as styles } from './LoginStyle'

export const Login = ({onSubmit}) => {
  return (
    <div style={styles.root}>
      {'Password:'}
      <input
        style={styles.input}
        type='password'
        onKeyDown={e => {
          if (e.keyCode === 13) {
            onSubmit(e.target.value)
          }
        }}
      />
    </div>
  )
}