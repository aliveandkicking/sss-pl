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

  root = null
  editinName = ''

  renderOuterControls() {
    const position = {}
    if (this.root) {
      const rect = this.root.getBoundingClientRect()
	    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      position.top = rect.top + scrollTop + dimensions.height +
        dimensions.outerControlsHeight > window.innerHeight,
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
        <CustomSpan
          key={'addsubgoal-button'}
          style={styles.outerButton}
          styleHover={styles.outerButtonHover}
          onClick={() => {
            this.props.onAddSub()
            this.setState({editing: false})
          }}
        >
          Add Subgoal
        </CustomSpan>
        <CustomSpan
          key={'deletegoal-button'}
          style={styles.outerButton}
          styleHover={styles.outerButtonHover}
          onClick={() => {
            this.props.onDelete()
            this.setState({editing: false})
          }}
        >
          Delete
        </CustomSpan>
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

        <CustomSpan
          style={{
            ...styles.content,
            ...(this.state.editing ? {zIndex: 3}: null)
          }}
          styleHover={styles.contentHover}
        >

          <CustomSpan
            style={styles.editButton}
            styleHover={styles.innerButtonHover}
            onClick={() => this.setState({editing: !this.state.editing})}
          >
            &#9881;
          </CustomSpan>

          {/* <div style={styles.checkMark}>
            &#10003;
          </div> */}

          {
            !this.state.editing
              ? <div
                style={styles.name}
                onDoubleClick={() => this.setState({editing: true})}
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
