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
    this.state = {loaded: false}
    stateHelper.loadState()
      .then(() => {
        this.setState({loaded: true})
      })
      .catch(() => {
        this.setState({loaded: true})
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
        <div>
          loading...
        </div>
      )
    }
  }
}

export default App
