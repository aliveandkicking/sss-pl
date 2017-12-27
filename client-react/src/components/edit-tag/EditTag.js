import { connect } from 'react-redux'
import { EditTagView } from './EditTagView'
import {
  setTagData,
  setEditingTag
} from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    editingTag: state.editingTag,
    tagInfo: state.editingTag ? state.tags[state.editingTag] : null
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { editingTag, tagInfo } = stateProps

  return {
    editingTag,
    tagInfo,
    onEditTagData: change => {
      if (editingTag) {
        dispatch(setTagData(editingTag, change))
      }
    },
    onClose: () => dispatch(setEditingTag(null))
  }
}

export const EditTag = connect(
  mapStateToProps,
  null,
  mergeProps
)(EditTagView)
