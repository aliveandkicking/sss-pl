const mode = (id, title) => { return {id, title} }

export const pages = {
  weekTasks: mode(0, 'Week'),
  taskList: mode(1, 'Task List'),
  goalsTree: mode(2, 'Goals Tree'),
  ids: []
}

pages.ids.push(
  pages.weekTasks.id,
  pages.taskList.id,
  pages.goalsTree.id
)
