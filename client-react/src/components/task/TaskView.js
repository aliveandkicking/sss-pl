import React from 'react'
import { taskStyles as styles } from './TaskStyle'
import { stringToColor } from '../../shared/utils/string-to-color'

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
    // let color = stringToColor.getColor(this.props.task.name)
    return Object.assign({},
      styles.content,
      this.props.isDone ? styles.contentSelected : null,
      {backgroundColor: stringToColor.getColor(this.props.task.name)}
      //{background: `linear-gradient(${color} 50%, yellow 200%)`}
    )
  }

  render () {
    return (
      <div
        onMouseOver={() => this.setState({hover: true})}
        onMouseOut={() => this.setState({hover: false})}
        style={styles.root}
        onClick={e => this.props.onClick()}
      >
        <div style={this.getContentStyle()}>
          <div
            style={this.getStyle(this.state.infoHover, styles.taskName, styles.taskNameHover)}>
              {this.props.task.name}
          </div>
          <div
            style={this.getStyle(this.state.infoHover, styles.taskAbbr, styles.taskAbbrHover)}>
            {this.props.taskNameAbbreviation}
          </div>

          <div style={this.getStyle(this.state.hover, styles.footer, styles.footerHover)}>
            <span
              onMouseOver={() => this.setState({infoHover: true})}
              onMouseOut={() => this.setState({infoHover: false})}
              onClick={e => {
                e.stopPropagation()
                this.props.onEdit()
            }}>
              &#9881;
            </span>
          </div>

        </div>
        <span style={this.getStyle(this.props.isDone, styles.checkMark, styles.checkMarkCheked)} />
      </div>
    )
  }
}
