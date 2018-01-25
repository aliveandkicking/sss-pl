import { connect } from 'react-redux'
import { WeekView } from './WeekView'
import {
  dateUtils
} from '../../core'

const mapStateToProps = (state, ownProps) => {
  return {
    initialDate: dateUtils.getStartOfWeek(state.initialDate)
  }
}

export const Week = connect(
  mapStateToProps
)(WeekView)
