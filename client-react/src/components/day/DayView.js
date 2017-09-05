import React from 'react'
import { dayStyles as styles } from './DayStyle'
import { Task } from '../task/Task'
import { CustomSpan } from '..'
import { dateUtils } from '../../core/dateutils'
import PropTypes from 'prop-types'

export class DayView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      quickAddDialogVisible: false,
      quickAddDialogTaskName: ''
    }
  }

  getTasks () {
    return this.props.tasks.map(task =>
      <Task
        key={task.id}
        task={task}
        date={this.props.date}
      />
    )
  }

  getQuickAddDialog () {
    if (!this.state.quickAddDialogVisible) {
      return null
    }
    const mergedStyle = Object.assign({}, styles.quickAddDialog,
      [dateUtils.FR, dateUtils.SA, dateUtils.SU].includes(this.props.date.getDay())
        ? styles.quickAddDialogRightSide
        : styles.quickAddDialogLeftSide
    )
    return (
      <div style={mergedStyle}>
        <div
          style={styles.quickAddDialogBackground}
          onClick={e => this.setState({quickAddDialogVisible: false})}>
        </div>
        <div style={styles.quickAddDialogContent}>
          <datalist id='predefined-names'>
            {this.props.predefinedTaskNames.map(name => <option key={name} value={name}/>)}
          </datalist>
          <input
            type='text'
            list='predefined-names'
            autoFocus
            placeholder='Task Name'
            style={styles.quickAddDialogInput}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                this.setState({quickAddDialogVisible: false})
                this.props.onAddTask(this.state.quickAddDialogTaskName)
              }
            }}
            onChange={e => this.setState({quickAddDialogTaskName: e.target.value})}/>
          <CustomSpan
            style={styles.quickAddDialogAddButton}
            styleHover={styles.quickAddDialogAddButtonHover}
            onClick={e => {
              this.setState({quickAddDialogVisible: false})
              this.props.onAddTask(this.state.quickAddDialogTaskName)
            }}>
            Add
          </CustomSpan>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div
        style={styles.root}
        onDragOver={e => {
          e.preventDefault()
          if (e.ctrlKey) {
            e.dataTransfer.dropEffect = 'copy';
          }
        }}
        onDrop={e => {
          e.preventDefault()
          try {
            const dropedData = JSON.parse(e.dataTransfer.getData('text/plain'))
            console.log(dropedData)
            this.props.dropTask(dropedData.id, dropedData.date, e.ctrlKey)
          } catch (error) {
            console(error)
          }
        }}>
        <div style={styles.caption}>
          {this.props.caption}
        </div>
        <div style={styles.content}>
          {this.getTasks()}
          <span style={styles.addTaskRow}>
            <CustomSpan
              style={styles.addTaskButton}
              styleHover={styles.addTaskButtonHover}
              onClick={e => this.props.onAddNewTask()}>
              +
            </CustomSpan>
            <CustomSpan
              style={Object.assign({}, styles.quickAddTaskButton,
                this.state.quickAddDialogVisible ? styles.addTaskButtonHover : null
              )}
              styleHover={styles.addTaskButtonHover}
              title='Quick Add'
              onClick={e => this.setState({quickAddDialogVisible: true})}>
              &#9660;
            </CustomSpan>
            {this.getQuickAddDialog()}
          </span>
        </div>
      </div>
    )
  }
}

DayView.propTypes = {
  caption: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  predefinedTaskNames: PropTypes.array.isRequired,
  date: PropTypes.object.isRequired,
  onAddNewTask: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  dropTask: PropTypes.func.isRequired
}
