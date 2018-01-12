import { connect } from 'react-redux'
import { GoalsTreeView } from './GoalsTreeView'
import { goalHelper } from '../../core'

const mapStateToProps = (state, ownProps) => {
  const processGoal = (goal) => {
    const result = {goal, subGoals: [], tasks: []}
    state.goals.forEach((currGoal) => {
      if (currGoal.parentId === goal.id) {
        result.subGoals.push(processGoal(currGoal))
      }
    })

    Object.values(state.tasks).forEach(task => {
      if (task.goalId === goal.id) {
        result.tasks.push(task)
      }
    })

    return result
  }

  const goalsTree = processGoal(goalHelper.create({id: 0, name: 'root'}))

  return {
    goalsTree
  }
}

const mapDispatchToProps = (dispatch) => {
  return { }
}

export const GoalsTree = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalsTreeView)

