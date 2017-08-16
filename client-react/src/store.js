import { createStore } from 'redux'
import rootReducer from './reducers'

//temp
import { TaskModel } from './shared/models/task-model';
import { dateUtils } from './shared/utils/dateutils';

let i = 0
const initialState = {
  tasks: {
    [++i]: new TaskModel({
      id: i,
      name: 'do exercise',
      startDate: new Date(2017, 7),
      repeatModeId: 1
    }),
    [++i]: new TaskModel({
      id: i,
      name: 'task with long name',
      startDate: new Date(2017, 7),
      repeatModeId: 1
    }),
    [++i]: new TaskModel({
      id: i,
      name: 'repeat every 2',
      startDate: new Date(2017, 7),
      repeatModeId: 1,
      every: 2
    }),
    [++i]: new TaskModel({
      id: i,
      name: 'sept task',
      startDate: new Date(2017, 8),
      repeatModeId: 1
    }),
  },
  doneTasks: {
    [dateUtils.toISOString(new Date())]: [1, 2]
  },
  editTask: {
    task: new TaskModel()
  }
}
//temp

export const store = createStore(rootReducer, initialState)

store.subscribe(() => {
  console.log(store.getState())
})


