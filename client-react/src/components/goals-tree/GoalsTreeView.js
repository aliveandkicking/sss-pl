import React from 'react'
import { goalsTreeStyles as styles } from './GoalsTreeStyle'
import PropTypes from 'prop-types'
import Scrollbars from 'react-custom-scrollbars'
import { Goal } from './goal/Goal'

export class GoalsTreeView extends React.Component {
  state = {
    collapsedNodes: {}
  }

  renderNode (first, last, nodeContent, children, key,
    isRoot = false, collapsed = false, onCollapseExpand = null
  ) {
    return (
      <div key={key} style={styles.node}>
        {
          !isRoot &&
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
        }
        {
          // !isRoot &&
          <div style={styles.nodeContentContainer}>
            {nodeContent}
          </div>
        }
        {
          children &&
          <div style={styles.connectionAfter}>
            <div
              style={styles.collapseExpandButton}
              onClick={onCollapseExpand}
            >
              {collapsed ? '+' : '-'}
            </div>
          </div>
        }
        {
          children && !collapsed &&
          <div style={styles.childrenContainer}>
            {children}
          </div>
        }
      </div>
    )
  }

  renderTasks (tasks) {
    const numOfRows = tasks.length < 4
     ? 1
     : tasks.length < 7
      ? 2
      : tasks.length < 20 ? 3 : 5

    let column = []
    let columns = []

    tasks.forEach(task => {
      column.push(
        <div style={styles.taskContainer} key={task.id}>
          <div style={styles.task}>
            {task.getNameAbbreviation()}
          </div>
        </div>
      )
      if (column.length === numOfRows) {
        columns.push(
          <div key={'col' + columns.length}>
            {column}
          </div>
        )
        column = []
      }
    })
    return (
      <div style={styles.tasksContainer}>
        {columns}
      </div>
    )
  }

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
        this.renderNode(
          !renderSubGoals,
          true,
          this.renderTasks(goalNode.tasks),
          null,
          goalNode.goal.id + 'tasks'
        )
      )
    }
    return result
  }

  renderGoalBranch (goalNode, first, last, isRoot = false) {
    return this.renderNode(
      first,
      last,
      <Goal goal={goalNode.goal}/>,
      this.renderChildren(goalNode),
      goalNode.goal.id,
      isRoot,
      this.state.collapsedNodes[goalNode.goal.id],
      () => this.setState({collapsedNodes: {
        ...this.state.collapsedNodes,
        [goalNode.goal.id]: !this.state.collapsedNodes[goalNode.goal.id]
      }})
    )
  }

  render () {
    const {goalsTree} = this.props
    return (
      <div style={styles.root}>
        <Scrollbars>
          <span style={styles.content}>
            {this.renderGoalBranch(goalsTree, false, false, true)}
          </span>
        </Scrollbars>
      </div>
    )
  }
}

GoalsTreeView.propTypes = {
  goalsTree: PropTypes.object
}

