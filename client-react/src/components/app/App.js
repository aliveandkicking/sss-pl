import React from 'react'
import { Root } from '..'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from '../../reducers'
import { stateHelper } from '../../core/state-helper'

const initStore = () => {
  const store = createStore(rootReducer, stateHelper.initialState)
  console.log(store.getState())
  store.subscribe(() => {
    const state = store.getState()
    console.log(state)
    stateHelper.saveState(state)
      .then(response => console.log(response))
      .catch(response => console.log(response))
  })
  return store
}

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      session: ''
    }
  }

  tryLoadState () {
    stateHelper.loadState()
    .then(() => {
      this.setState({loaded: true})
    })
    .catch(() => {
      this.setState({loaded: true})
      alert("Sandbox mode");
    })
  }

  render () {
    if (this.state.loaded) {
      return (
        <Provider store={initStore()}>
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
          <input type='password'
            onKeyDown={e => {
              if (e.keyCode === 13) {
                console.log(e.target.value)
                this.setState({session: e.target.value})
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
