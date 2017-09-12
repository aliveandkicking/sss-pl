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

  const getPredefinedNames = () => {
    const result = []
    for (let key in tasks) {
      if (tasks.hasOwnProperty(key)) {
        result.push(tasks[key].name)
      }
    }
    return result
  }

  const dropTask = (sourceId, sourceDateStr, copy) => {
    if ((!sourceId) || (!sourceDateStr)) {
      return
    }
    const sourceDate = dateUtils.fromISOString(sourceDateStr)
    if (sourceDate.getTime() === date.getTime()) {
      return
    }
    const task = Object.values(tasks).find(task => task.id.toString() === sourceId.toString())
    if (task) {
      const newTask = new TaskModel(task)
      newTask.includeDate(date)
      if (!copy) {
        newTask.excludeDate(sourceDate)
      }
      dispatch(changeTask(newTask))
    }
  }

  const getNewTaskId = () => {
    let maxId = 0
    for (let key in tasks) {
      if (maxId < tasks[key].id) {
        maxId = tasks[key].id
      }
    }
    return ++maxId
  }

  const addTask = name => {
    if (!name) {
      return
    }
    for (let key in tasks) {
      if (tasks.hasOwnProperty(key)) {
        if (tasks[key].name === name) {
          const modifiedTask = new TaskModel(tasks[key]).includeDate(date)
            dispatch(changeTask(modifiedTask))
            return
          }
        }
      }
    dispatch(changeTask(new TaskModel({
      name,
      startDate: date,
      id: getNewTaskId()
    })))
  }

  const getTasksGroupedByTag = () => {
    const result = []
    Object.values(tasks).forEach(task => {
      if (task.containsDate(date)) {
        let tagGroup = result.find(tagGroup => tagGroup[0].tag === task.tag)
        if (tagGroup) {
          tagGroup.push(task)
        } else {
          result.push([task])
        }
      }
    })
    return result.sort((first, second) => first[0].tag > second[0].tag)
  }

  return {
    caption: formatCaption(date),
    date,
    tasksGroupedByTag: getTasksGroupedByTag(),
    predefinedTaskNames: getPredefinedNames(),
    onAddNewTask: () => dispatch(setEditingTask(new TaskModel({startDate: date}))),
    onAddTask: addTask,
    dropTask: dropTask
  }
}

export const Day = connect(
  mapStateToProps,
  null,
  mergeProps
)(DayView)
