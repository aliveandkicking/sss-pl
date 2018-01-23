const mode = (id, title) => { return {id, title} }

export const pages = {
  weekTasks: mode(0, 'Week'),
  dayTasks: mode(1, 'Week'),
  taskList: mode(2, 'Task List'),
  goalsTree: mode(3, 'Goals Tree'),
  ids: []
}

pages.ids.push(
  pages.weekTasks.id,
  pages.dayTasks.id,
  pages.taskList.id,
  pages.goalsTree.id
)
