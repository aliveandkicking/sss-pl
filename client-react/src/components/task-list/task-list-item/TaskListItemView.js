import React from 'react'
import { taskListItemStyles as styles } from './TaskListItemStyle'
import { stringToColor } from '../../../shared/utils/string-to-color'
import PropTypes from 'prop-types'

export class TaskListItemView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {hover: false}
  }

  render () {
    return (
      <div style={styles.root}>
        {this.props.task.name}
      </div>
    )
  }

}

TaskListItemView.propTypes = {
  task: PropTypes.object
}
