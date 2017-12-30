import React from 'react'
import { Root, Login } from '..'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from '../../reducers'
import { stateHelper } from '../../core'
import {
  setStatusText,
  setNeedSave,
  SET_NEED_SAVE,
  SET_STATUS_TEXT
} from '../../actions'

function middleware ({getState}) {
  return next => action => {
    const result = next(action)
    if (![SET_NEED_SAVE, SET_STATUS_TEXT].includes(action.type)) {
      if (!getState().needSave) {
        next(setNeedSave(true))
      }
    }
    return result
  }
}

const DEV = true

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.session = ''
    this.sandbox = DEV
    this.state = {loaded: DEV}
    this.store = null
    this.saveTimeout = null
    this.activityTimeout = null
    this.activityTimeoutCallback = () => {
      if (window.confirm('Activity timeout. Reload ?')) {
        window.location.reload(true)
      }
    }

    if (!DEV) {
      this.session = window.localStorage.getItem('session')
      if (this.session) {
        this.tryLoadState()
      }
    }

    this.restartActivityTimeout()
  }

  restartActivityTimeout () {
    clearTimeout(this.activityTimeout)
    this.activityTimeout = setTimeout(this.activityTimeoutCallback, 120 * 60 * 1000)
  }

  initStore () {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    this.store = createStore(
      rootReducer,
      stateHelper.initialState,
      composeEnhancers(
        applyMiddleware(middleware)
      )
    )
    console.log('initial state >>> ', this.store.getState())

    this.store.subscribe(() => {
      const state = this.store.getState()
      console.log(state)
      this.restartActivityTimeout()

      if (!this.sandbox && state.needSave) {
        clearTimeout(this.saveTimeout)
        this.saveTimeout = setTimeout(() => {
          this.store.dispatch(setNeedSave(false))
          this.store.dispatch(setStatusText('saving state...'))
          stateHelper.saveState(this.session, state)
            .then(response => {
              console.log('then >>> ', response)
              this.store.dispatch(setStatusText('saved'))
            })
            .catch(response => {
              console.log('catch >>>', response)
              this.store.dispatch(setStatusText('ERROR: could not save state'))
            })
        }, 200)
      }
    })
  }

  tryLoadState () {
    stateHelper.loadState(this.session)
    .then(() => {
      this.setState({loaded: true})
      window.localStorage.setItem('session', this.session)
      this.store.dispatch(setStatusText('loaded'))
    })
    .catch(() => {
      if (window.prompt('Proceed with sandbox mode?', 'y')) {
        this.setState({loaded: true})
        this.sandbox = true
        this.store.dispatch(setStatusText('using sandbox'))
      }
    })
  }

  render () {
    if (this.state.loaded) {
      this.initStore()
      this.canSaveStatus = true
      return (
        <Provider store={this.store}>
          <Root />
        </Provider>
      )
    } else {
      return (
        <Login onSubmit={value => {
          console.log(value)
          this.session = value
          this.tryLoadState()
        }} />
      )
    }
  }
}

export default App
