import React from 'react'
import { goalsTreeStyles as styles } from './GoalsTreeStyle'
import PropTypes from 'prop-types'
import Scrollbars from 'react-custom-scrollbars'

const first = 1
const inner = 2
const last = 3

export class GoalsTreeView extends React.Component {

  // renderGoalNode () {
  //   return (

  //   )
  // }

  renderGoalBranch (goalNode, position) {
    return (
      <div
        key={goalNode.goal.id}
        style={{
          border: '1px solid rgba(255,255,255,0.1)',
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
            borderLeft: position === first ? null : '1px solid #ddd',
            width: '20px'
          }} />
          <div style={{
            flex: 1,
            borderTop: '1px solid #ddd',
            borderLeft: position === last ? null : '1px solid #ddd',
            width: '20px'
          }} />
        </div>


        <div style={{
          width: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {goalNode.goal.name}
        </div>

        <div style={{
          borderBottom: '1px solid #ddd',
          width: '20px',
          alignSelf: 'center'
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          {
            goalNode.children.map((currGoalNode, index) => {
              return this.renderGoalBranch(currGoalNode,
                index === 0
                  ? first
                  : index === (goalNode.children.length - 1)
                    ? last
                    : inner
              )
            })
          }
        </div>

      </div>
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

