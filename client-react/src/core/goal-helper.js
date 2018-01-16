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
}

export const goalHelper = new GoalHelper()
