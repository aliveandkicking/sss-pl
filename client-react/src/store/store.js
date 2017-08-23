import { createStore } from 'redux'
import { rootReducer } from '../reducers'
import { loadState } from './state'

export const store = createStore(rootReducer, loadState().state)

store.subscribe(() => {
  console.log(store.getState())
})


