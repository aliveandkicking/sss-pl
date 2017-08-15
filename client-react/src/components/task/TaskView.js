import React from 'react'
import { taskStyles as styles } from './TaskStyle'

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

  render () {
    return(
      <div
        onMouseOver={() => this.setState({hover: true})}
        onMouseOut={() => this.setState({hover: false})}
        style={this.getStyle(this.props.isMarked, styles.root, styles.selectedRoot)}
        onClick={e => this.props.onClick()}
      >
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

        <span style={this.getStyle(this.props.isMarked, styles.checkMark, styles.checkMarkCheked)} />
      </div>
    )
  }
}
