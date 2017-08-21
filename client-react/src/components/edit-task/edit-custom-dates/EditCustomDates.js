import { connect } from 'react-redux'
import { EditCustomDatesView } from './EditCustomDatesView'

const mapStateToProps = (state, ownProps) => {
  return {
    skipDates: ownProps.skipDates,
    includeDates: ownProps.includeDates,
    onHide: ownProps.onHide
  }
}

export const EditCustomDates = connect(mapStateToProps)(EditCustomDatesView)
