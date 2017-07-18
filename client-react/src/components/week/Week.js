import React, { Component } from 'react';
import { weekStyles } from './WeekStyle';
// import { PropTypes } from 'prop-types';
import { Day } from '..';
import { WeekNavigationHeader } from '../../containers';

export class Week extends Component {
  randerDays () {
    let result = []
    for (let i = 0; i < 7; i++) {
       result.push(<Day key={i}/>)
    }
    return result
  }

  render() {
    return (
      <div style={weekStyles.root} >
        <div style={weekStyles.header}>
          <WeekNavigationHeader />
        </div>
        <div style={weekStyles.content}>
          {this.randerDays()}
        </div>
      </div>
    );
  }
}

// Week.propTypes = {
//   date: PropTypes.bool.isRequired
// }
