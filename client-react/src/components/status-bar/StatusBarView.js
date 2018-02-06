import React from 'react'
import { statusBarStyles as styles } from './StatusBarStyles'
import PropTypes from 'prop-types'

class ProgressBar extends React.Component {
  state = {millisecondsElapsed: 0}

  componentDidMount () {
    this.interval = setInterval(() => this.setState({
      millisecondsElapsed: this.state.millisecondsElapsed + 1
    }), 50)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const total = (new Date(2100, 6, 1)) - (new Date(1989, 5, 27))
    const progress = (new Date()) - (new Date(1989, 5, 27))
    const progressPerc = progress * 100 / total

    return (
      <div style={styles.progressBarContainer}>
        <div style={styles.progressBarCaption}>
          {progressPerc.toFixed(9) + ' %'}
        </div>
        <div style={{
          ...styles.progressBar,
          width: Math.round(progressPerc * 0.98 /* margins */) + '%'
        }} />
      </div>
    )
  }
}

export const StatusBarView = ({text, currentGoals}) => {
  return (
    <div style={styles.root}>
      <div style={styles.goalsContainer}>
        {
          currentGoals.map(goal => <div
            key={goal.id}
            style={styles.goal}
            >
            <div>
              {goal.name}
            </div>
            {
              goal.passive &&
              <div style={styles.goalLabel}>
                {'P'}
              </div>
            }
          </div>)
        }
      </div>
      <ProgressBar />
      <span style={styles.statusLabel}>
        {text}
      </span>
    </div>
  )
}

StatusBarView.propTypes = {
  text: PropTypes.string,
  currentGoals: PropTypes.array
}
