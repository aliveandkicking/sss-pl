import { connect } from 'react-redux'
import { NavigationHeaderView } from './NavigationHeaderView'
import {
  addTask,
  setEditingTaskId,
  setInitialDate
} from '../../actions'
import { TaskModel } from '../../shared/models/task-model';
import { tasks, state } from '../../store';
import { dateUtils } from '../../shared/utils/dateutils';

const getNewTaskId = () => {
  let maxId = 0;
  for (let key in tasks()) {
    if (maxId < tasks()[key].id) {
      maxId = tasks()[key].id
    }
  }
  return ++maxId
}

const mapStateToProps = (state, ownProps) => {
  return {
    dateCaption: state.initialDate.toString()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAdd: () => {
      const id = getNewTaskId()
      dispatch(addTask({task: new TaskModel({id})}))
      dispatch(setEditingTaskId({id, isNew: true}))
    },
    onNext: () => dispatch(setInitialDate({
      date: dateUtils.incDay(state().initialDate, dateUtils.DAYS_IN_WEEK)
    })),
    onPrev: () => dispatch(setInitialDate({
      date: dateUtils.decDay(state().initialDate, dateUtils.DAYS_IN_WEEK)
    })),
    onToday: () => dispatch(setInitialDate({
      date: dateUtils.getStartOfWeek(new Date())
    })),
  }
}

export const WeekNavigationHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationHeaderView)
