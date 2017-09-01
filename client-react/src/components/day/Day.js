import { connect } from 'react-redux'
import { DayView } from './DayView'
import { dateUtils } from '../../core/dateutils'
import { TaskModel } from '../../core/task-model'
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
  const { tasks } = stateProps
  const { date } = ownProps

  const dropTask = (sourceId, sourceDateStr, copy) => {
    if ((!sourceId) || (!sourceDateStr)) {
      return
    }
    const task = Object.values(tasks).find(task => task.id.toString() === sourceId.toString())
    if (task) {
      const newTask = new TaskModel(task)
      if (!newTask.containsDate(date)) {
        const dateTime = date.getTime()
        if (newTask.skipDates.includes(dateTime)) {
          newTask.skipDates = newTask.skipDates.filter(el => el !== dateTime)
        }
        if (!newTask.containsDate(date)) {
          newTask.addIncludeDate(date)
        }
      }
      if (!copy) {
        const sourceDate = dateUtils.fromISOString(sourceDateStr)
        const sourceDateTime = sourceDate.getTime()
        if (newTask.includeDates.includes(sourceDateTime)) {
          newTask.includeDates = newTask.includeDates.filter(el => el !== sourceDateTime)
        }
        if (newTask.containsDate(sourceDate)) {
          newTask.addSkipDate(sourceDate)
        }
      }
      dispatch(changeTask(newTask))
    }
  }

  return {
    caption: formatCaption(date),
    date,
    tasks: Object.values(tasks).filter(task => task.containsDate(date)),
    addTask: () => dispatch(setEditingTask(new TaskModel({startDate: date}))),
    dropTask: dropTask
  }
}

export const Day = connect(
  mapStateToProps,
  null,
  mergeProps
)(DayView)
