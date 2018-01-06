class GoalHelper {

  create (data = null) {
    return {
      id: null,
      parentId: null,
      name: 'achieve something',
      ...data
    }
  }
}

export const goalHelper = new GoalHelper()
