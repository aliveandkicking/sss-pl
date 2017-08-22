import { connect } from 'react-redux'
import { DayView } from './DayView'
import { dateUtils } from '../../shared/utils/dateutils'
import { TaskModel } from '../../shared/models/task-model'
import {
  setEditingTask
} from '../../actions'

const formatCaption = date => {
  return `${dateUtils.DAY_NAMES[date.getDay()]} ${date.getDate()}-${date.getMonth() + 1}`
}

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: Object.values(state.tasks).filter(task => task.containsDate(ownProps.date))
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps

  return {
    title: formatCaption(ownProps.date),
    date: ownProps.date,
    tasks: stateProps.tasks,
    addTask: () => {
      dispatch(setEditingTask(new TaskModel({startDate: ownProps.date})))
    }
  }
}

export const Day = connect(
  mapStateToProps,
  null,
  mergeProps
)(DayView)
