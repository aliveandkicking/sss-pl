import { connect } from 'react-redux'
import { DayView } from './DayView'
import { dateUtils, TaskModel } from '../../core'
import {
  setEditingTask,
  changeTask
} from '../../actions'

const formatCaption = date => {
  return `${dateUtils.DAY_NAMES[date.getDay()]} ${date.getDate()}-${date.getMonth() + 1}`
}

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks,
    doneTasks: state.doneTasks,
    tagsInfo: state.tags
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { tasks, doneTasks, tagsInfo } = stateProps
  const { date, hideCaption } = ownProps

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
    return Object.keys(tasks)
      .reduce((maxId, key) => (maxId < tasks[key].id) ? tasks[key].id : maxId, 0) + 1
  }

  const addTask = name => {
    if (!name) {
      return
    }
    const existingTask = Object.values(tasks).find(task => task.name === name)
    if (existingTask) {
      return dispatch(changeTask(new TaskModel(existingTask).includeDate(date)))
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
    return result.sort((first, second) => {
      const firstIndex =
        (tagsInfo[first[0].tag] && tagsInfo[first[0].tag].sortOrder) || 0
      const secondIndex =
        (tagsInfo[second[0].tag] && tagsInfo[second[0].tag].sortOrder) || 0
      return firstIndex - secondIndex
    })
  }

  const tasksGroupedByTag = getTasksGroupedByTag()

  const isComplete = tasksGroupedByTag.every(tagGroup => tagGroup.every(
    task => {
      const dateStr = dateUtils.toISOString(ownProps.date)
      const doneInfo = doneTasks[dateStr] && doneTasks[dateStr]
        .find(info => (info[0] === task.id))
      return doneInfo && (doneInfo[1] === doneInfo[2])
    }
  ))

  return {
    caption: formatCaption(date),
    date,
    tasksGroupedByTag,
    isComplete,
    hideCaption,
    predefinedTaskNames: Object.keys(tasks).map(key => tasks[key].name),
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
