import React from 'react'
import { goalsStyles as styles } from './GoalStyle'
import PropTypes from 'prop-types'
import { CustomSpan } from '../..'

export class GoalView extends React.Component {
  state = {
    editing: false
  }

  render () {
    const {goal} = this.props

    return (
      <div>
        {
          this.state.editing &&
          <div
            style={styles.backgroundInEditMode}
            onClick={() => this.setState({editing: false})}
          />
        }
        <CustomSpan
          style={{
            ...styles.goal,
            ...(this.state.editing ? {zIndex: 1}: null)
          }}
          styleHover={styles.goalHover}
        >

          <CustomSpan
            style={styles.editGoalButton}
            styleHover={styles.goalButtonHover}
          >
            &#9881;
          </CustomSpan>

          <CustomSpan
            style={styles.checkBoxGoalButton}
            styleHover={styles.goalButtonHover}
          >
            &#10003;
          </CustomSpan>

          {
            !this.state.editing
              ? <div
                style={styles.goalName}
                onDoubleClick={() => this.setState({editing: true})}
              >
                {goal.name}
              </div>
              : <input
                style={styles.goalNameInput}
                type='text'
                autoFocus
                onFocus={e => e.target.select()}
                defaultValue={goal.name}
              />
          }

        </CustomSpan>
      </div>
    )
  }

}

GoalView.propTypes = {
  goal: PropTypes.object
}
