class GoalHelper {

  create (data = null) {
    return {
      id: null,
      parentId: null,
      name: 'achieve something',
      date: null,
      complete: false,
      inProgress: false,
      passive: false,
      ...data
    }
  }

  buildGoalsTree (goals, tasks) {
    const rootTasks = []

    const processGoal = (goal) => {
      const result = {goal, subGoals: [], tasks: []}
      goals.forEach((currGoal) => {
        if (currGoal.parentId === goal.id) {
          result.subGoals.push(processGoal(currGoal))
        }
      })

      Object.values(tasks).forEach(task => {
        if (!task.goalId) {
          if (!rootTasks.find(taskIter => taskIter.id === task.id)) {
            rootTasks.push(task)
          }
        } else if (task.goalId === goal.id) {
          result.tasks.push(task)
        }
      })
      return result
    }

    const root = goals.find(goal => !goal.id)
    const goalsTree = processGoal(goalHelper.create(root))
    goalsTree.tasks.push(...rootTasks)

    return goalsTree
  }
}

export const goalHelper = new GoalHelper()

