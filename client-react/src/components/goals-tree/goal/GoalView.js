import React from 'react'
import {
  goalsStyles as styles,
  dimensions
} from './GoalStyle'
import PropTypes from 'prop-types'
import { CustomSpan } from '../..'

export class GoalView extends React.Component {
  state = {
    editing: false
  }

  clicked = false
  root = null
  editinName = ''

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

    return [
      <CustomSpan
        key={'save-button'}
        style={{
          ...styles.saveButton,
          ...(position.top ? {top: '-36px'} : {bottom: '-36px'})
        }}
        styleHover={styles.outerButtonHover}
        onClick={() => {
          this.props.onChange({name: this.editinName})
          this.setState({editing: false})
        }}
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
        [
          {caption: 'Add Subgoal', action: this.props.onAddSub},
          {caption: 'Delete', action: this.props.onDelete},
          {
            caption: !this.props.goal.passive ? 'Passive' : 'Active',
            action: () => this.props.onChange({passive: !this.props.goal.passive})
          },
          {
            caption: !this.props.goal.inProgress ? 'In Progress' : 'Pending',
            action: () => this.props.onChange({inProgress: !this.props.goal.inProgress})
          },
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
          </div>

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
                onChange={event => this.editinName = event.currentTarget.value}
                onKeyUp={e => {
                  if (e.keyCode === 13) {
                    this.props.onChange({name: this.editinName})
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
  goal: PropTypes.object
}
