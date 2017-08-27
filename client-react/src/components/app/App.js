import React from 'react'
import { Root } from '..'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from '../../reducers'
import { loadState, saveState, getInitialState } from '../../store/state'

const initStore = () => {
  const store = createStore(rootReducer, getInitialState())
  console.log(store.getState())
  store.subscribe(() => {
    const state = store.getState()
    console.log(state)
    saveState(state)
  })
  return store
}

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {loaded: false}
    loadState()
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
