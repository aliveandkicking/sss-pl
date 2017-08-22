import { connect } from 'react-redux'
import { DayView } from './DayView'
import { dateUtils } from '../../shared/utils/dateutils'
import { TaskModel } from '../../shared/models/task-model'
import {
  setEditingTask,
  changeTask
} from '../../actions'

const formatCaption = date => {
  return `${dateUtils.DAY_NAMES[date.getDay()]} ${date.getDate()}-${date.getMonth() + 1}`
}

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps

  return {
    caption: formatCaption(ownProps.date),
    date: ownProps.date,
    tasks: Object.values(stateProps.tasks).filter(task => task.containsDate(ownProps.date)),
    addTask: (id) => {
      if (id) {
        const task = Object.values(stateProps.tasks).find(task => task.id.toString() === id.toString())
        if (task) {
          if (!task.containsDate(ownProps.date)) {
            const dateTime = ownProps.date.getTime()
            const newTask = new TaskModel(task)
            if (newTask.skipDates.includes(dateTime)) {
              newTask.skipDates = newTask.skipDates.filter(el => el !== dateTime)
            }
            if (newTask.containsDate(ownProps.date)) {
              dispatch(changeTask(newTask))
            } else {
              dispatch(changeTask(newTask.addIncludeDate(ownProps.date)))
            }
          }
        }
      } else {
        dispatch(setEditingTask(new TaskModel({startDate: ownProps.date})))
      }
    }
  }
}

export const Day = connect(
  mapStateToProps,
  null,
  mergeProps
)(DayView)
