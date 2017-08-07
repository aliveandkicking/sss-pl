import React from 'react';
import { taskStyles } from './TaskStyle';

export const TaskView = ({task, onClick, isMarked}) => {
    return (
      <div
        style={!isMarked ? taskStyles.root : taskStyles.selectedRoot}
        onClick={(e) => {
          e.preventDefault()
          onClick()
        }}
      >
        {task.name}
      </div>
    )
}
