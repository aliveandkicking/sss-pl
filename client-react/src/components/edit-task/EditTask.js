import { connect } from 'react-redux'
import { EditTaskView } from './EditTaskView'
import { changeTask, setEditingTask } from '../../actions'
import { TaskModel } from '../../shared/models/task-model'
import { state, tasks } from '../../store'
import { repeatMode } from '../../shared/immutable/repeat-modes';

const getNewTaskId = () => {
  let maxId = 0;
  for (let key in tasks()) {
    if (maxId < tasks()[key].id) {
      maxId = tasks()[key].id
    }
  }
  return ++maxId
}

const processWeekDay = (day) => {
  const result = Array.from(state().editTask.task.weeklyDays)
  const index = result.indexOf(day)
  if (index >= 0) {
    result.splice(index, 1)
  } else {
    result.push(day)
  }
  return result
  //  dispatch(setEditingTask(new TaskModel(taskInState, changes)))
  // onModelChanges({weeklyDays: processWeekDay(day)})}
}

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.editTask.task
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onModelChanges: (changes) => {
      const taskInState = state().editTask.task
      dispatch(setEditingTask(new TaskModel(taskInState, changes)))
    },
    onClose: (submit) => {
      if (submit) {
        const task = new TaskModel(state().editTask.task)
        if (!task.id) {
          task.id = getNewTaskId()
        }
        dispatch(changeTask(task))
      }
      dispatch(setEditingTask(null))
    },
    onCalendarCellClick: cell => {
      if (cell.isDayName) {
        if (state().editTask.task.repeatModeId === repeatMode.weekly.id) {
          
        }

      } else {

      }
      console.log(cell)
    }
  }
}

export const EditTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTaskView)
