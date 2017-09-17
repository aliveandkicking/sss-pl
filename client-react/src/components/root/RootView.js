import React from 'react'
import { Week, EditTask, TaskList, MainMenu, StatusBar } from '..'
import { rootStyles as styles } from './RootStyle'
import PropTypes from 'prop-types'

export const RootView = ({ showTaskList }) => {
  return (
    <div style={styles.root}>
      <div style={styles.content}>
        {showTaskList ? <TaskList /> : <Week />}
      </div>
      <StatusBar />
      <EditTask />
      <MainMenu />
    </div>
  )
}

RootView.propTypes = {
  showTaskList: PropTypes.bool.isRequired
}
