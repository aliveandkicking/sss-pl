import React from 'react'
import { goalsTreeStyles as styles } from './GoalsTreeStyle'
import PropTypes from 'prop-types'
import Scrollbars from 'react-custom-scrollbars'
import { Task } from '..'

const renderNode = (first, last, onRenderNode, onRenderChildren, key) => {
  return (
    <div
      key={key}
      style={{
        // border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        minHeight: '70px'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          flex: 1,
          borderLeft: first ? null : '1px solid #ddd',
          width: '20px'
        }} />
        <div style={{
          flex: 1,
          borderTop: '1px solid #ddd',
          borderLeft: last ? null : '1px solid #ddd',
          width: '20px'
        }} />
      </div>

      <div style={{
        minWidth: '150px',
        display: 'flex',
        alignItems: 'center',
        padding: '5px 0px'
      }}>
        <div style={{
          flex: 1,
          minHeight: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #ddd',
          padding: '5px',
          textAlign: 'center'
        }}>
          {onRenderNode()}
        </div>
      </div>

      {
        onRenderChildren &&
        <div style={{
          borderBottom: '1px solid #ddd',
          width: '20px',
          alignSelf: 'center'
        }} />
      }
      {
        onRenderChildren &&
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          {onRenderChildren()}
        </div>
      }

    </div>
  )
}

export class GoalsTreeView extends React.Component {

  getRenderChildrenHandler (goalNode) {
    const renderSubGoals = goalNode.subGoals && goalNode.subGoals.length > 0
    const renderTasks = goalNode.tasks && goalNode.tasks.length > 0
    if (!renderSubGoals && !renderTasks) {
      return null
    }
    return () => {
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
            () => goalNode.tasks.map(task => (
              <div
                key={task.id}
                style={{
                  backgroundColor: 'rgba(200,200,200,0.2)',
                  // padding: '10px',
                  // width: '85px',
                  // height: '50px',
                  // margin: '2px'
                }}
              >
                <Task
                  key={task.id}
                  task={task}
                  date={new Date()}
                />
              </div>
            )),
            null,
            goalNode.goal.id + 'tasks'
          )
        )
      }
      return result
    }
  }

  renderGoalBranch (goalNode, first, last) {
    return renderNode(first, last, () => (
        goalNode.goal.name
      ),
      this.getRenderChildrenHandler(goalNode),
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

