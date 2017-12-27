import React from 'react'
import { editTagStyles as styles } from './EditTagStyle'
import PropTypes from 'prop-types'
import { CustomSpan } from '..'

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
        <div style={styles.header}>
          {`Edit tag "${editingTag}"`}
          <CustomSpan
            style={styles.closeButton}
            styleHover={styles.closeButtonHover}
            onClick={onClose}
          >
            x
          </CustomSpan>
        </div>

        <label style={styles.label}>
          Tag color
          <input
            type='color'
            style={styles.input}
            defaultValue={tagInfo && tagInfo.color ? tagInfo.color : '#666666'}
            onChange={e => onEditTagData({color: e.target.value})}
            />
        </label>

        <label style={styles.label}>
          Sort order
          <input
            style={styles.input}
            type='number'
            defaultValue={tagInfo && tagInfo.sortOrder ? tagInfo.sortOrder : 1}
            onChange={e => onEditTagData({sortOrder: parseInt(e.target.value, 10)})}
          />
        </label>

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
