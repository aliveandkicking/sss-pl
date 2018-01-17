import { connect } from 'react-redux'
import { VocabularyView } from './VocabularyView'
import { dateUtils } from '../../core'
// import { setWindowSize } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  const dateStr = dateUtils.toISOString(ownProps.date)
  return {
    term: state.vocabulary.find(termIter => termIter.date === dateStr)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const Vocabulary = connect(
  mapStateToProps,
  mapDispatchToProps
)(VocabularyView)

