import React from 'react'
import { taskStyles } from './TaskStyle'

export const TaskView = ({
  task,
  onClick,
  onEdit,
  isMarked
}) => {
  return (
    <div
      style={!isMarked ? taskStyles.root : taskStyles.selectedRoot}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {task.name}
      <span onClick={(e) => {
        e.stopPropagation()
        onEdit()
      }}>
        {' edit'}
      </span>
    </div>
  )
}
