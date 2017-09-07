import React from 'react'
import { Root } from '..'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from '../../reducers'
import { stateHelper } from '../../core/state-helper'

const DEV = true

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.session = ''
    this.state = {loaded: DEV}
    if (!DEV) {
      this.session = localStorage.getItem('session')
      if (this.session) {
        this.tryLoadState()
      }
    }
  }

  initStore () {
    const store = createStore(rootReducer, stateHelper.initialState)
    console.log(store.getState())
    store.subscribe(() => {
      const state = store.getState()
      console.log(state)
      if (!DEV) {
        stateHelper.saveState(this.session, state)
          .then(response => console.log('then ', response))
          .catch(response => console.log('catch ', response))
      }
    })
    return store
  }

  tryLoadState () {
    stateHelper.loadState(this.session)
    .then(() => {
      this.setState({loaded: true})
      localStorage.setItem('session', this.session)
    })
    .catch(() => {
      if (prompt('Proceed with sandbox mode?', 'y')) {
        this.setState({loaded: true})
      }
    })
  }

  render () {
    if (this.state.loaded) {
      return (
        <Provider store={this.initStore()}>
          <Root />
        </Provider>
      )
    } else {
      return (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {'Password:'}
          <input type='password'
            onKeyDown={e => {
              if (e.keyCode === 13) {
                console.log(e.target.value)
                this.session = e.target.value
                this.tryLoadState()
              }
            }}
          />
        </div>
      )
    }
  }
}

export default App
