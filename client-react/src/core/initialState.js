import {
  TaskModel,
  dateUtils,
  goalHelper
} from '.'

let i = 0
export const defInitialState = {
  initialDate: dateUtils.clearTime(new Date()),
  pageId: 2,
  mainMenuExpanded: false,
  tasks: {
    [++i]: new TaskModel({
      id: i,
      goalId: 7,
      name: 'do exercise',
      startDate: new Date(2017, 7),
      repeatModeId: 1,
      includeDates: [dateUtils.clearTime(new Date())],
      tag: 'Work'
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 7,
      name: 'task with long name',
      startDate: new Date(2017, 7),
      repeatModeId: 1,
      tag: 'Home'
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 7,
      name: 'charm',
      startDate: dateUtils.incDay(dateUtils.today()),
      repeatModeId: 1,
      tag: 'Home'
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 7,
      name: 'katana',
      startDate: dateUtils.incDay(dateUtils.today()),
      repeatModeId: 1,
      tag: 'Home'
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 7,
      name: 'rouge',
      startDate: dateUtils.incDay(dateUtils.today()),
      repeatModeId: 1,
      tag: 'Home'
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 7,
      name: 'rouge',
      startDate: dateUtils.incDay(dateUtils.today()),
      repeatModeId: 1,
      tag: 'Home'
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 7,
      name: 'rouge',
      startDate: dateUtils.incDay(dateUtils.today()),
      repeatModeId: 1,
      tag: 'Home'
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 7,
      name: 'rouge',
      startDate: dateUtils.incDay(dateUtils.today()),
      repeatModeId: 1,
      tag: 'Home'
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 7,
      name: 'rouge',
      startDate: dateUtils.incDay(dateUtils.today()),
      repeatModeId: 1,
      tag: 'Home'
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 7,
      name: 'rouge',
      startDate: dateUtils.incDay(dateUtils.today()),
      repeatModeId: 1,
      tag: 'Home'
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 7,
      name: 'rouge',
      startDate: dateUtils.incDay(dateUtils.today()),
      repeatModeId: 1,
      tag: 'Home'
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 12,
      name: 'repeat every 2',
      startDate: new Date(2017, 7),
      repeatModeId: 1,
      every: 2,
      tag: 'Home',
      timesPerDay: 4
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 12,
      name: 'sept task',
      startDate: new Date(2017, 8),
      repeatModeId: 1,
      tag: 'Work'
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 12,
      name: 'clinger winger',
      startDate: new Date(2017, 8),
      repeatModeId: 1,
      every: 2
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 12,
      name: 'winger',
      startDate: new Date(2017, 8),
      repeatModeId: 1,
      every: 2
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 12,
      name: 'clinger',
      startDate: new Date(2017, 8),
      repeatModeId: 1,
      every: 2
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 12,
      name: 'sssds',
      startDate: new Date(),
      repeatModeId: 1,
      every: 2
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 12,
      name: 'red',
      startDate: new Date(),
      repeatModeId: 1,
      every: 2
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 12,
      name: 'blue th',
      startDate: new Date(),
      repeatModeId: 1,
      every: 2
    }),
    [++i]: new TaskModel({
      id: i,
      goalId: 12,
      name: 'waltari',
      startDate: new Date(),
      repeatModeId: 1,
      every: 2
    }),
  },
  doneTasks: {
    [dateUtils.toISOString(new Date())]: [[3, 1, 1], [1, 1, 1], [2, 1, 2]]
  },
  goals: [
    goalHelper.create({
      id: 1,
      parentId: 0,
      name: 'conquer the world'
    }),
    goalHelper.create({
      id: 2,
      parentId: 0,
      name: 'kill all humans'
    }),
    goalHelper.create({
      id: 3,
      parentId: 0,
      name: 'rule what rests'
    }),
    goalHelper.create({
      id: 4,
      parentId: 1,
      name: 'do something'
    }),
    goalHelper.create({
      id: 5,
      parentId: 1,
      name: 'do something else'
    }),
    goalHelper.create({
      id: 6,
      parentId: 1,
      name: 'do one more thing'
    }),
    goalHelper.create({
      id: 7,
      parentId: 1,
      name: 'do one last thing'
    }),
    goalHelper.create({
      id: 8,
      parentId: 7,
      name: 'find fox'
    }),
    goalHelper.create({
      id: 9,
      parentId: 7,
      name: 'find cat'
    }),
    goalHelper.create({
      id: 10,
      parentId: 9,
      name: 'feed cat'
    }),
    goalHelper.create({
      id: 11,
      parentId: 10,
      name: 'take care of cat'
    }),
    goalHelper.create({
      id: 12,
      parentId: 10,
      name: 'play with cat'
    })
  ],
  editTask: {
    calendarInitialDate: dateUtils.clearTime(new Date()),
    calendarMonthMode: false,
    task: null,
    showingCustomDates: false
  }
}

// export const defInitialState = {

// }