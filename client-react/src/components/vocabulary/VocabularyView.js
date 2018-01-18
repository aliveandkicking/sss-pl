import React from 'react'
import { vocabularyStyles as styles } from './VocabularyStyle'
import PropTypes from 'prop-types'

export class VocabularyView extends React.Component {

  render () {
    const {term} = this.props
    if (!term) {
      return null
    }
    return (
      <div style={styles.root}>
        <div style={styles.content}>
          <a href={'https://translate.google.com.ua/?hl=uk&tab=wT&authuser=0#en/uk/' + term.text}>
            {term.text + ' - ' + term.explanation}
          </a>
        </div>
      </div>
    )
  }
}

VocabularyView.propTypes = {
  term: PropTypes.object
}
