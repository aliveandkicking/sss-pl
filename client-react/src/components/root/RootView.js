import React from 'react'
import {
  Week,
  DayMode,
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

  getPage (pageId) {
    if (pageId === pages.taskList.id) {
      return <TaskList />
    } else if (pageId === pages.dayTasks.id) {
      return <DayMode />
    } else if (pageId === pages.weekTasks.id) {
      return <Week />
    } else if (pageId === pages.goalsTree.id) {
      return <GoalsTree />
    }
  }

  render () {
    const {pageId} = this.props
    return (
      <div style={styles.root}>
        <div style={styles.content}>
          {this.getPage(pageId)}
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
