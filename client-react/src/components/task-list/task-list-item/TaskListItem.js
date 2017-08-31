import { connect } from 'react-redux'
import { TaskListItemView } from './TaskListItemView'
import { dateUtils } from '../../../core/dateutils'
import { setEditingTask } from '../../../actions'
import { TaskModel } from '../../../core/task-model'

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.tasks[ownProps.taskId]
  }
}

const taskIsValid = (task) => {
  let date = new Date(task.startDate)
  const endDateValue = task.neverEnd
      ? dateUtils.incYear(task.startDate, 3).getTime()
      : task.endDate.getTime()
  while (date.getTime() <= endDateValue) {
    if (task.containsDate(date)) {
      return true
    }
    date = dateUtils.incDay(date)
  }
  return false
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { task } = stateProps


  return {
    task,
    isValid: taskIsValid(task),
    onEdit: () => dispatch(setEditingTask(new TaskModel(task))),
  }
}

export const TaskListItem = connect(
  mapStateToProps,
  null,
  mergeProps
)(TaskListItemView)
