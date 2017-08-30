import React from 'react'
import { taskListItemStyles as styles } from './TaskListItemStyle'
import { stringToColor } from '../../../shared/utils/string-to-color'
import PropTypes from 'prop-types'
import { repeatMode } from '../../../shared/immutable/repeat-modes'

export class TaskListItemView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {hover: false}
  }

  render () {
    return (
      <div style={styles.root}>
        <div style={styles.name}>
          {this.props.task.name}
        </div>
        <div style={styles.info}>
          {repeatMode.all[this.props.task.repeatModeId].title}
          {' | every: ' + this.props.task.every}
        </div>
      </div>
    )
  }
}

TaskListItemView.propTypes = {
  task: PropTypes.object
}
