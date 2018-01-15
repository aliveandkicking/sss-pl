class GoalHelper {

  create (data = null) {
    return {
      id: null,
      parentId: null,
      name: 'achieve something',
      complete: false,
      inProgress: false,
      passive: false,
      ...data
    }
  }
}

export const goalHelper = new GoalHelper()
