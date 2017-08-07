import { createStore } from 'redux'
import rootReducer from './reducers'
// import { buildJsonString, loadFromJsonString } from './shared/utils/json-processor';

// const loadedState =  loadFromJsonString({}, localStorage.getItem('state'))
// console.log('loaded state', loadedState)

export const store = createStore(rootReducer)
export const state = () => store.getState()
export const tasks = () => store.getState().tasks
export const doneTasks = () => store.getState().doneTasks

store.subscribe(() => {
  console.log(state())
  // localStorage.setItem('state', buildJsonString(state()))
})
