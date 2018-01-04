import React from 'react'
import {
  Week,
  EditTask,
  TaskList,
  GoalsTree,
  MainMenu,
  StatusBar,
  EditTag
} from '..'
import { rootStyles as styles } from './RootStyle'
import { pages } from '../../core'
import PropTypes from 'prop-types'

export class RootView extends React.Component {
  // onResizeHandler = () => {
  //   this.props.onResize({height: window.innerHeight, width: window.innerWidth})
  // }

  // componentWillUnmount() {
  //  window.removeEventListener('resize', this.onResizeHandler)
  // }

  // componentDidMount() {
  //   window.addEventListener('resize', this.onResizeHandler)
  // }

  render () {
    const {pageId} = this.props
    return (
      <div style={styles.root}>
        <div style={styles.content}>
          {
            (pageId === pages.taskList.id ? <TaskList /> : false) ||
            (pageId === pages.weekTasks.id ? <Week /> : false) ||
            (pageId === pages.goalsTree.id ? <GoalsTree /> : false)
          }
        </div>
        <StatusBar />
        <EditTask />
        <MainMenu />
        <EditTag />
      </div>
    )
  }
}

RootView.propTypes = {
  pageId: PropTypes.number.isRequired
}
