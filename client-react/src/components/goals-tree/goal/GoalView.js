import React from 'react'
import {
  goalsStyles as styles,
  dimensions
} from './GoalStyle'
import PropTypes from 'prop-types'
import { CustomSpan } from '../..'
import { dateUtils } from '../../../core'

export class GoalView extends React.Component {
  state = {
    editing: false
  }

  clicked = false
  root = null
  editingName = ''
  editingDate = null

  getDateText (date) {
    return dateUtils.MONTH_NAMES_SHORT[date.getMonth()] + ' ' +
      date.getDate() + '/' +
      date.getFullYear().toString().substr(2) + ' (' +
      dateUtils.DAY_NAMES[date.getDay()] + ')'
  }

  postChangesIfNeeded = () => {
    let needPostChanges = false
    const changes = {
      ...(this.editingName ? (needPostChanges = true, {name: this.editingName}) : null),
      ...(this.editingDate ? (needPostChanges = true, {date: this.editingDate}) : null)
    }
    if (needPostChanges) {
      this.props.onChange(changes)
    }
    this.setState({editing: false})
  }

  renderOuterControls() {
    const position = {}
    if (this.root) {
      const rect = this.root.getBoundingClientRect()
	    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      position.top = rect.top + scrollTop + dimensions.height +
        dimensions.outerControlsHeight > window.innerHeight
      position.left = rect.left + scrollLeft + dimensions.width +
        dimensions.outerControlsWidth > window.innerWidth
    }

    const {goal, onChange, onAddSub, onAddNewTask, onDelete, onChangeTasksVisibility,
       onChangePendingSubgoalsVisibility, onChangeCompleteSubgoalsVisibility,
       tasksHidden, pendingSubgoalsHidden, completeSubgoalsHidden} = this.props

    return [
      <CustomSpan
        key={'save-button'}
        style={{
          ...styles.saveButton,
          ...(position.top ? {top: '-36px'} : {bottom: '-36px'})
        }}
        styleHover={styles.outerButtonHover}
        onClick={this.postChangesIfNeeded}
      >
        Save
      </CustomSpan>,
      <div
        key={'outer-button-container'}
        style={{
          ...styles.outerButtonsContainer,
          ...(position.top ? {bottom: '0px'}: {top: '0px'}),
          ...(position.left
            ? {left: -dimensions.outerControlsWidth - 5 + 'px'}
            : {right: -dimensions.outerControlsWidth - 5 + 'px'}
          ),
          ...(position.top ? {justifyContent: 'flex-end'} : null)
        }}
      >
        {
          <div style={styles.dateContainer}>
            <input
              type="date"
              defaultValue={goal.date
                ? goal.date
                : dateUtils.toISOString(new Date())
              }
              onChange={event => {
                if (event.currentTarget.value) {
                  this.editingDate = event.currentTarget.value
                }
              }}
            />
          </div>
        }
        {
          [
            {caption: 'Add Subgoal', action: onAddSub},
            {caption: 'Add Task', action: onAddNewTask},
            {caption: 'Delete', action: onDelete},
            {
              caption: !goal.passive ? 'Passive' : 'Active',
              action: () => onChange({passive: !goal.passive})
            },
            {
              caption: !goal.inProgress ? 'In Progress' : 'Pending',
              action: () => onChange({inProgress: !goal.inProgress})
            },
            {
              caption: tasksHidden ? 'Show Tasks' : 'Hide Tasks',
              action: () => onChangeTasksVisibility()
            },
            {
              caption: pendingSubgoalsHidden ? 'Show Pending Subgoals' : 'Hide Pending Subgoals',
              action: () => onChangePendingSubgoalsVisibility()
            },
            {
              caption: completeSubgoalsHidden ? 'Show Complete Subgoals' : 'Hide Complete Subgoals',
              action: () => onChangeCompleteSubgoalsVisibility()
            }
          ].map(el => <CustomSpan
              key={el.caption}
              style={styles.outerButton}
              styleHover={styles.outerButtonHover}
              onClick={() => {
                el.action()
                this.setState({editing: false})
              }}
            >
              {el.caption}
            </CustomSpan>)
        }
      </div>
    ]
  }

  render () {
    const {goal} = this.props

    return (
      <div
        style={styles.root}
        ref={element => this.root = element}
      >
        {
          this.state.editing && [
            <div
              key={'background'}
              style={styles.backgroundInEditMode}
              onClick={() => this.setState({editing: false})}
            />,
            ...this.renderOuterControls()
          ]
        }
        {
          <div style={{
            ...styles.checkMark,
            ...(goal.complete ? styles.checkMarkVisible : null)
            }}
          >
            &#x2713;
          </div>
        }

        <CustomSpan
          style={{
            ...styles.content,
            ...(
                goal.complete && !this.state.editing
                  ?  styles.contentComplete
                  : null
               ),
            ...(
                !goal.inProgress && !this.state.editing
                  ?  styles.contentPending
                  : null
               ),
            ...(this.state.editing ? {zIndex: 3}: null)
          }}
          styleHover={styles.contentHover}
        >
          <div style={styles.labelRow}>
            {
              !goal.inProgress && !goal.complete &&
              <div style={styles.label}>
                pending
              </div>
            }
            {
              goal.passive &&
              <div style={styles.label}>
                passive
              </div>
            }
            {
              (this.props.tasksHidden ||
                this.props.completeSubgoalsHidden ||
                this.props.pendingSubgoalsHidden) &&
              <div style={styles.filterLabel}>
                F
              </div>
            }
          </div>

          {
            goal.date &&
            <div style={styles.date}>
              {this.getDateText(dateUtils.fromISOString(goal.date))}
            </div>
          }

          <CustomSpan
            style={styles.editButton}
            styleHover={styles.innerButtonHover}
            onClick={() => this.setState({editing: !this.state.editing})}
          >
            &#9881;
          </CustomSpan>

          {
            !this.state.editing
              ? <div
                style={styles.name}
                onClick={() => this.props.onChange({
                    complete: !goal.complete,
                    inProgress: !goal.complete || goal.inProgress
                  })
                }
              >
                {goal.name}
              </div>
              : <input
                style={styles.nameInput}
                type='text'
                autoFocus
                onFocus={e => e.target.select()}
                defaultValue={goal.name}
                onChange={event => this.editingName = event.currentTarget.value}
                onKeyUp={e => {
                  if (e.keyCode === 13) {
                    this.postChangesIfNeeded()
                    this.setState({editing: false})
                  }
                }}
              />
          }

        </CustomSpan>
      </div>
    )
  }

}

GoalView.propTypes = {
  goal: PropTypes.object,
  onAddNewTask: PropTypes.func
}
