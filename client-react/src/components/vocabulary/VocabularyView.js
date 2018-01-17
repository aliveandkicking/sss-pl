import React from 'react'
import { vocabularyStyles as styles } from './VocabularyStyle'
import PropTypes from 'prop-types'

export class VocabularyView extends React.Component {

  render () {
    const {term} = this.props

    return (
      <div style={styles.root}>
        <div style={styles.content}>
          {term.original + term.ranslation}
        </div>
      </div>
    )
  }
}

VocabularyView.propTypes = {
  term: PropTypes.object.isRequired
}
