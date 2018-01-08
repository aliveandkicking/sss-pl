import React from 'react'
import { goalsTreeStyles as styles } from './GoalsTreeStyle'
import PropTypes from 'prop-types'

export class GoalsTreeView extends React.Component {

  renderGoal (goal) {
    return (
      <div
        key={goal.id}
        style={{
          border: '1px solid #ccc'
        }}
      >
        {goal.name}
      </div>
    )
  }

  render () {
    const {goals} = this.props

    return (
      <div style={styles.root}>
        {
          goals.map(goal => this.renderGoal(goal))
        }
      </div>
    )
  }
}

GoalsTreeView.propTypes = {
  goals: PropTypes.array
}

