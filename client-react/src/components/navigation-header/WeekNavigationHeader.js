import { connect } from 'react-redux'
import { NavigationHeaderView } from './NavigationHeaderView'
import { setEditTaskVisibility, setEditingTask } from '../../actions'
import { TaskModel } from '../../shared/models/task-model';

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.date.toString()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAdd: () => {
      dispatch(setEditingTask(new TaskModel()))
      dispatch(setEditTaskVisibility(true))
    },
    onNext: () => {},
    onPrev: () => {},
    onToday: () => {}
  }
}

export const WeekNavigationHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationHeaderView)
