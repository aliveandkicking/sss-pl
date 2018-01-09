import React from 'react'
import { goalsTreeStyles as styles } from './GoalsTreeStyle'
import PropTypes from 'prop-types'
import Scrollbars from 'react-custom-scrollbars'
import { renderGoal } from './goal'
import { renderTask } from './task'

const renderNode = (first, last, nodeContent, children, key) => {
  return (
    <div key={key} style={styles.node}>

      <div style={styles.connectionsContainer}>
        <div style={{
          ...styles.connectionTop,
          ...(first ? {borderLeft: null} : null)
        }} />
        <div style={{
          ...styles.connectionBottom,
          ...(last ? {borderLeft: null} : null)
        }} />
      </div>

      <div style={styles.nodeContentContainer}>
        {nodeContent}
      </div>
      {
        children && <div style={styles.connectionAfter} />
      }
      {
        children &&
        <div style={styles.childrenContainer}>
          {children}
        </div>
      }
    </div>
  )
}

export class GoalsTreeView extends React.Component {

  renderChildren (goalNode) {
    const renderSubGoals = goalNode.subGoals && goalNode.subGoals.length > 0
    const renderTasks = goalNode.tasks && goalNode.tasks.length > 0
    if (!renderSubGoals && !renderTasks) {
      return null
    }
    const result = []
    if (renderSubGoals) {
      goalNode.subGoals.forEach((currGoalNode, index) => {
        result.push(this.renderGoalBranch(
          currGoalNode,
          index === 0,
          (index === (goalNode.subGoals.length - 1)) &&
            (goalNode.tasks.length < 1)
        ))
      })
    }
    if (renderTasks) {
      result.push(
        renderNode(
          !renderSubGoals,
          true,
          goalNode.tasks.map(task => (
            <div
              key={task.id}
              style={{
                backgroundColor: 'rgba(200,200,200,0.2)',
              }}
            >
              {renderTask(task)}
            </div>
          )),
          null,
          goalNode.goal.id + 'tasks'
        )
      )
    }
    return result
  }

  renderGoalBranch (goalNode, first, last) {
    return renderNode(
      first, last,
      renderGoal(goalNode.goal),
      this.renderChildren(goalNode),
      goalNode.goal.id
    )
  }

  render () {
    const {goalsTree} = this.props
    return (
      <div style={styles.root}>
        <Scrollbars>
          <span style={styles.content}>
            {this.renderGoalBranch(goalsTree)}
          </span>
        </Scrollbars>
      </div>
    )
  }
}

GoalsTreeView.propTypes = {
  goalsTree: PropTypes.object
}

