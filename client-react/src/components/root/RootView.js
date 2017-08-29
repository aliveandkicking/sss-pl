import React from 'react'
import { Week, EditTask, TaskList, MainMenu } from '..'
import { rootStyles as styles } from './RootStyle'

export const RootView = ({ showTaskList }) => {

  return (
    <div style={styles.root}>
      {showTaskList ? <TaskList /> : <Week />}
      <EditTask />
      <MainMenu />
    </div>
  )
}