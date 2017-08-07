import { connect } from 'react-redux'
import { TaskView } from './TaskView'
import { changeTask } from '../../actions'
import { TaskModel } from '../../shared/models/task-model';

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.task.isMarkedOnDate(ownProps.date))
  return {
    task: ownProps.task,
    isMarked: ownProps.task.isMarkedOnDate(ownProps.date)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      let task = new TaskModel(ownProps.task)
      if (task.isMarkedOnDate(ownProps.date)) {
        task.removeMarkedDate(ownProps.date)
      } else {
        task.addMarkedDate(ownProps.date)
      }
      dispatch(changeTask({task}))
    }
  }
}

export const Task = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskView)
