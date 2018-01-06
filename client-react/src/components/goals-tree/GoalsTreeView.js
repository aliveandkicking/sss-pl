import React from 'react'
import { goalsTreeStyles as styles } from './GoalsTreeStyle'
import PropTypes from 'prop-types'

export class GoalsTreeView extends React.Component {

  render () {
    const {goals} = this.props

    return (
      <div style={styles.root}>
        {
          goals.map(goal => <div key={goal.id}>{goal.name}</div>)
        }
      </div>
    )
  }
}

GoalsTreeView.propTypes = {
  goals: PropTypes.array
}

