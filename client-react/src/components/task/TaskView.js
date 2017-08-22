import React from 'react'
import { taskStyles as styles } from './TaskStyle'
import { stringToColor } from '../../shared/utils/string-to-color'
import { CustomSpan } from '..';

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
      this.props.isDone ? styles.contentSelected : null,
      this.state.hover ? styles.contentHover : null,
      {backgroundColor: color},
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
          event.dataTransfer.setData('text/plain', this.props.task.id)}
        onClick={e => this.props.onClick()}
      >
        <div style={this.getContentStyle()}>
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
             style={styles.footer}
             styleHover={styles.footerHover}>
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

        </div>
        <span style={this.getStyle(this.props.isDone, styles.checkMark, styles.checkMarkCheked)} />
      </div>
    )
  }
}
