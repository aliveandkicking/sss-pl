import React from 'react'
import { goalsTreeStyles as styles } from './GoalsTreeStyle'
import PropTypes from 'prop-types'
import Scrollbars from 'react-custom-scrollbars'
import { Goal } from './goal/Goal'
import { CustomSpan } from '../custom-span/CustomSpan';

export class GoalsTreeView extends React.Component {

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
            <CustomSpan
              style={styles.collapseExpandButton}
              styleHover={styles.collapseExpandButtonHover}
              onClick={onCollapseExpand}
            >
              {collapsed ? '+' : '-'}
            </CustomSpan>
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

  hideTasksForGoal (id) {
    if (this.props.goalTreeSettings.withHiddenTasks) {
      return this.props.goalTreeSettings.withHiddenTasks.includes(id)
    }
    return false
  }

  hideCompleteSubgoalsForGoal (id) {
    if (this.props.goalTreeSettings.withHiddenComplete) {
      return this.props.goalTreeSettings.withHiddenComplete.includes(id)
    }
    return false
  }

  renderChildren (goalNode) {
    const renderSubGoals = goalNode.subGoals && goalNode.subGoals.length > 0
    const renderTasks = goalNode.tasks &&
      goalNode.tasks.length > 0 && !this.hideTasksForGoal(goalNode.goal.id)
    if (!renderSubGoals && !renderTasks) {
      return null
    }
    const result = []
    if (renderSubGoals) {
      goalNode.subGoals.reduce((visibleGoals, currNode) => {

      })

      goalNode.subGoals.forEach((currGoalNode, index) => {
        if (currGoalNode.goal.inProgress) {
          result.push(this.renderGoalBranch(
            currGoalNode,
            countOfVisible === 0,
            (index === (goalNode.subGoals.length - 1)) &&
              ((goalNode.tasks.length < 1) || this.hideTasksForGoal(goalNode.goal.id))
          ))
        }
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
    const {goalTreeSettings: {collapsedNodes}} = this.props
    return this.renderNode(
      first,
      last,
      <Goal goal={goalNode.goal} />,
       this.renderChildren(goalNode),
      goalNode.goal.id,
      isRoot,
      collapsedNodes[goalNode.goal.id],
      () => this.props.onChanges({collapsedNodes: {
        ...collapsedNodes,
        [goalNode.goal.id]: !collapsedNodes[goalNode.goal.id]
      }})
    )
  }

  render () {
    const {goalsTree} = this.props
    return (
      <div style={styles.root}>
        <Scrollbars>
          <div style={styles.content}>
            {this.renderGoalBranch(goalsTree, false, false, true)}
          </div>
        </Scrollbars>
      </div>
    )
  }
}

GoalsTreeView.propTypes = {
  goalsTree: PropTypes.object,
  goalTreeSettings: PropTypes.object,
  onChanges: PropTypes.func
}

