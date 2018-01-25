import React from 'react'
import { vocabularyStyles as styles_ } from './VocabularyStyle'
import PropTypes from 'prop-types'
import './vocabulary.css'

const translateUrlPrefix = 'https://translate.google.com.ua/?hl=uk&tab=wT&authuser=0#en/uk/'

export class VocabularyView extends React.Component {

  render () {
    const {term} = this.props
    if (!term) {
      return <div>-</div>
    }
    return (
      <div style={styles_.root}>
        <div style={styles_.content}>
          <a
            className={'vocabulary-link'}
            target={'_blank'}
            href={translateUrlPrefix + term.text}
          >
            <span className={'vocabulary-text'}>
              {term.text}
            </span>
            <span className={'vocabulary-explanation'}>
              {' - ' + term.explanation}
            </span>
          </a>
        </div>
      </div>
    )
  }
}

VocabularyView.propTypes = {
  term: PropTypes.object
}
