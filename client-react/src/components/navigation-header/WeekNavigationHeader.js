import { connect } from 'react-redux'
import { NavigationHeaderView } from './NavigationHeaderView'
import {
  setEditingTask,
  setInitialDate
} from '../../actions'
import { TaskModel } from '../../shared/models/task-model';
import { state } from '../../store';
import { dateUtils } from '../../shared/utils/dateutils';

const mapStateToProps = (state, ownProps) => {
  return {
    dateCaption: state.initialDate.toString()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAdd: () => dispatch(setEditingTask(new TaskModel())),
    onNext: () => dispatch(setInitialDate(dateUtils.incDay(state().initialDate, dateUtils.DAYS_IN_WEEK))),
    onPrev: () => dispatch(setInitialDate(dateUtils.decDay(state().initialDate, dateUtils.DAYS_IN_WEEK))),
    onToday: () => dispatch(setInitialDate(dateUtils.getStartOfWeek(new Date()))),
  }
}

export const WeekNavigationHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationHeaderView)
