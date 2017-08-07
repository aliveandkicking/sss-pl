import { connect } from 'react-redux'
import { TaskView } from './TaskView'
import { addDoneTask, removeDoneTask } from '../../actions'
import { doneTasks } from '../../store'
import { dateUtils } from '../../shared/utils/dateutils';

const isDone = (taskId, date) => {
  const dateStr = dateUtils.toISOString(date)
  return doneTasks()[dateStr] ? doneTasks()[dateStr].includes(taskId) : false
}

const mapStateToProps = (state, ownProps) => {
  return {
    task: ownProps.task,
    isMarked: isDone(ownProps.task.id, ownProps.date)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      const payload = {taskId: ownProps.task.id, date: ownProps.date}
      if (isDone(ownProps.task.id, ownProps.date)) {
        dispatch(removeDoneTask(payload))
      } else {
        dispatch(addDoneTask(payload))
      }
    },
    onEdit: () => {

    }
  }
}

export const Task = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskView)
