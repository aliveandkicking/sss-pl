import React, { Component } from 'react';
import { dayStyles } from './DayStyle';
import { Task } from '../task/Task';

export class Day extends Component {
  randerTasks () {
    let result = []
    for (let i = 0; i < 5; i++) {
       result.push(<Task key={i}/>)
    }
    return result
  }

  render() {
    return (
      <div style={dayStyles.root}>
        {this.randerTasks()}
      </div>
    );
  }
}