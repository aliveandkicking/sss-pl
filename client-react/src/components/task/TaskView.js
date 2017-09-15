import React from 'react'
import { taskStyles as styles } from './TaskStyle'
import { stringToColor } from '../../core/string-to-color'
import { dateUtils } from '../../core/dateutils'
import { CustomSpan } from '..'
import PropTypes from 'prop-types'

export class TaskView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {hover: false, infoHover: false}
  }

  getStyle (needMerge, baseStyle, styleToMerge) {
    if (needMerge) {
      return Object.assign({}, baseStyle, styleToMerge)
    }
    return baseStyle
  }

  getContentStyle () {
    const color = stringToColor.getColor(this.props.task.name)
    return Object.assign({},
      styles.content,
      this.props.doneInfo[1] === this.props.doneInfo[2] ? styles.contentSelected : null,
      this.state.hover ? styles.contentHover : null,
      {backgroundColor: color}
    )
  }

  render () {
    return (
      <div
        onMouseOver={() => this.setState({hover: true})}
        onMouseOut={() => this.setState({hover: false})}
        style={styles.root}
        draggable='true'
        onDragStart={event =>
          event.dataTransfer.setData('text/plain', JSON.stringify(
              {
                id: this.props.task.id,
                date: dateUtils.toISOString(this.props.date)
              }
            )
          )}
        onMouseUp={e => {
          if (e.button === 0) {
            this.props.onClick()
          } else if (e.button === 1) {
            this.props.onRemoveDoneTask()
          }
        }}
      >
        <div style={this.getContentStyle()}>
          <CustomSpan
            style={Object.assign({},
              styles.tagMark,
              {backgroundColor: stringToColor.getColor(this.props.task.tag)}
            )}
            styleHover={styles.tagMarkHover}
            title={this.props.task.tag}
            >
          </CustomSpan>

          <CustomSpan
            style={styles.removeButton}
            styleHover={styles.removeButtonHover}
            onClick={e => {
              e.stopPropagation()
              this.props.onDelete()
            }}>
            x
          </CustomSpan>

          <div
            style={this.getStyle(this.state.infoHover, styles.taskName, styles.taskNameHover)}>
            {this.props.task.name}
          </div>
          <div
            style={this.getStyle(this.state.infoHover, styles.taskAbbr, styles.taskAbbrHover)}>
            {this.props.taskNameAbbreviation}
          </div>

          <CustomSpan
            style={styles.editButton}
            styleHover={styles.editButtonHover}>
            <span
              onMouseOver={() => this.setState({infoHover: true})}
              onMouseOut={() => this.setState({infoHover: false})}
              onClick={e => {
                e.stopPropagation()
                this.props.onEdit()
              }}>
              &#9881;
            </span>
          </CustomSpan>

        {
          (this.props.doneInfo[1] < this.props.doneInfo[2]) &&
          <span
            style={Object.assign({},
              styles.progressBar,
              this.state.hover && styles.progressBarHover)}
              title='Middle Click to Decrease'
            >
          {`x ${this.props.doneInfo[1]}/${this.props.doneInfo[2]}`}
          </span>
        }

        </div>
        <span style={this.getStyle(
          this.props.doneInfo[1] === this.props.doneInfo[2],
          styles.checkMark,
          styles.checkMarkCheked)} />
      </div>
    )
  }
}

TaskView.propTypes = {
  task: PropTypes.object,
  taskNameAbbreviation: PropTypes.string,
  doneInfo: PropTypes.array,
  onClick: PropTypes.func,
  onRemoveDoneTask: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}
