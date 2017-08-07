import { connect } from 'react-redux'
import { WeekView } from './WeekView'
import { dateUtils } from '../../shared/utils/dateutils';

const mapStateToProps = (state, ownProps) => {
  return {
    initialDate: dateUtils.getStartOfWeek(state.initialDate)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { }
}

export const Week = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekView)
