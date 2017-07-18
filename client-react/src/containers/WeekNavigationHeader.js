import { connect } from 'react-redux'
import { NavigationHeader } from '../components'
import { setEditTaskVisibility } from '../actions'
import { dateUtils } from '../utils/dateutils';

const mapStateToProps = (state, ownProps) => {
  return {
    dateCaption: state.date.toString()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAdd: () => {dispatch(setEditTaskVisibility(true))},
    onNext: () => {},
    onPrev: () => {},
    onToday: () => {}
  }
}

export const WeekNavigationHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationHeader)
