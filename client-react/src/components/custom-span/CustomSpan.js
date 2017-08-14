import React from 'react'

const reservedProps = ['style', 'styleHover']

export class CustomSpan extends React.Component {
  constructor (props) {
    super(props)
    this.state = {hover: false}
  }

  render () {
    const innerProps = {}
    for (let key in this.props) {
      if (!(reservedProps.find(el => el === key))) {
        innerProps[key] = this.props[key]
      }
    }

    const hoverStyle = Object.assign({}, this.props.style, this.props.styleHover)

    return React.createElement('span', {
      onMouseOver: () => this.setState({hover: true}),
      onMouseOut: () => this.setState({hover: false}),
      style: this.state.hover ? hoverStyle : this.props.style,
      ...innerProps
    }, this.props.children)
  }
}