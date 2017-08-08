import { connect } from 'react-redux'
import { TaskView } from './TaskView'
import {
  addDoneTask,
  removeDoneTask,
  setEditingTask
} from '../../actions'
import { doneTasks } from '../../store'
import { dateUtils } from '../../shared/utils/dateutils'
import { TaskModel } from '../../shared/models/task-model'

const isDone = (date, taskId) => {
  const dateStr = dateUtils.toISOString(date)
  return doneTasks()[dateStr] ? doneTasks()[dateStr].includes(taskId) : false
}

const mapStateToProps = (state, ownProps) => {
  return {
    task: ownProps.task,
    isMarked: isDone(ownProps.date, ownProps.task.id)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      if (isDone(ownProps.date, ownProps.task.id)) {
        dispatch(removeDoneTask(ownProps.date, ownProps.task.id))
      } else {
        dispatch(addDoneTask(ownProps.date, ownProps.task.id))
      }
    },
    onEdit: () => dispatch(setEditingTask(new TaskModel(ownProps.task)))
  }
}

export const Task = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskView)