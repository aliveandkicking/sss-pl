import React from 'react'
import { Week, EditTask, TaskList, MainMenu, StatusBar } from '..'
import { rootStyles as styles } from './RootStyle'
import { pages } from '../../core'
import PropTypes from 'prop-types'

export const RootView = ({ pageId }) => {
  return (
    <div style={styles.root}>
      <div style={styles.content}>
        {
          (pageId === pages.taskList.id ? <TaskList /> : false) ||
          <Week />
        }
      </div>
      <StatusBar />
      <EditTask />
      <MainMenu />
    </div>
  )
}

RootView.propTypes = {
  pageId: PropTypes.number.isRequired
}
