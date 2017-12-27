import React from 'react'
import { taskStyles as styles } from './TaskStyle'
import { stringToColor, dateUtils } from '../../core'
import { CustomSpan } from '..'
import PropTypes from 'prop-types'

export class TaskView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hover: false,
      infoHover: false
    }
  }

  getStyle (needMerge, baseStyle, styleToMerge) {
    if (needMerge) {
      return Object.assign({}, baseStyle, styleToMerge)
    }
    return baseStyle
  }

  getContentStyle () {
    return Object.assign({},
      styles.content,
      this.props.doneInfo[1] === this.props.doneInfo[2] ? styles.contentSelected : null,
      this.state.hover ? styles.contentHover : null,
      this.props.task.tag &&
        {backgroundColor: stringToColor.getColor(this.props.task.tag)}
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
          event.dataTransfer.setData('text/plain', JSON.stringify({
            id: this.props.task.id,
            date: dateUtils.toISOString(this.props.date)
          }
        ))}
        onClick={e => {
          if (e.ctrlKey) {
            e.shiftKey
            ? this.props.onChangeTimesPerDay(-1)
            : this.props.onChangeTimesPerDay(1)
          } else {
            e.shiftKey
            ? this.props.onRemoveDoneTask()
            : this.props.onClick()
          }
        }}>
        <div style={this.getContentStyle()}>

          {
            (this.props.task.tag.length > 0) &&
            <CustomSpan
              style={styles.tagMark}
              styleHover={styles.tagMarkHover}
              title={this.props.task.tag}
              onClick={event => {
                this.props.onTagClick()
                event.stopPropagation()
              }}
            />
          }

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
                this.props.onEdit()
                return e.stopPropagation()
              }}>
              &#9881;
            </span>
          </CustomSpan>

          {
            (this.props.doneInfo[1] < this.props.doneInfo[2]) &&
            (this.props.doneInfo[2] > 1) &&
            <span
              style={Object.assign({},
                styles.progressBar,
                this.state.hover && styles.progressBarHover)}>
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
  date: PropTypes.object,
  task: PropTypes.object,
  taskNameAbbreviation: PropTypes.string,
  doneInfo: PropTypes.array,
  onClick: PropTypes.func,
  onRemoveDoneTask: PropTypes.func,
  onChangeTimesPerDay: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onTagClick: PropTypes.func
}
