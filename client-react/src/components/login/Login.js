import React from 'react'
import { loginStyles as styles } from './LoginStyle'
import PropTypes from 'prop-types'

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

Login.propTypes = {
  onSubmit: PropTypes.func
}
