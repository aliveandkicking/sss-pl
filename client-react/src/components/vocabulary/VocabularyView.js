import React from 'react'
import { vocabularyStyles as styles } from './VocabularyStyle'
import PropTypes from 'prop-types'

const translateUrlPrefix = 'https://translate.google.com.ua/?hl=uk&tab=wT&authuser=0#en/uk/'

export class VocabularyView extends React.Component {

  render () {
    const {term} = this.props
    if (!term) {
      return null
    }
    return (
      <div style={styles.root}>
        <div style={styles.content}
          title={term.text + ' - ' + term.explanation}
        >
          <a
            target={'_blank'}
            href={translateUrlPrefix + term.text}
          >
            <div
              style={styles.link}
            >
              {term.text + ' - ' + term.explanation}
            </div>
          </a>
        </div>
      </div>
    )
  }
}

VocabularyView.propTypes = {
  term: PropTypes.object
}
