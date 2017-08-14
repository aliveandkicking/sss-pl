import React from 'react';

export class CustomSpan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  render () {
    const innerProps = {}
    for (let key in this.props) {
      if ((key !== 'styleHover') && (key !== 'style')) {
        innerProps[key] = this.props[key]
      }
    }

    return React.createElement('span', {
      onMouseOver: () => this.setState({hover: true}),
      onMouseOut: () => this.setState({hover: false}),
      style: this.state.hover ? this.props.styleHover : this.props.style,
      ...innerProps
    }, this.props.children)
  }
}