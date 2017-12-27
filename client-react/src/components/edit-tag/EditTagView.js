import React from 'react'
import { editTagStyles as styles } from './EditTagStyle'
import PropTypes from 'prop-types'

export const EditTagView = ({
  tagInfo,
  editingTag,
  onEditTagData,
  onClose
}) => {
  if (!editingTag) {
    return null
  }

  return (
    <div
      style={styles.root}
      onClick={onClose}
    >
      <div
        style={styles.dialog}
        onClick={e => { e.stopPropagation() }}
      >
        {editingTag}
        <input
          type='color'
          defaultValue={tagInfo && tagInfo.color ? tagInfo.color : '#666666'}
          onChange={e => onEditTagData({color: e.target.value})}
        />
        <input
          type='number'
          defaultValue={tagInfo && tagInfo.sortOrder ? tagInfo.sortOrder : 1}
          onChange={e => onEditTagData({sortOrder: parseInt(e.target.value, 10)})}
        />
      </div>
    </div>
  )
}

EditTagView.propTypes = {
  editingTag: PropTypes.string,
  tagInfo: PropTypes.object,
  onEditTagData: PropTypes.func,
  onClose: PropTypes.func
}
