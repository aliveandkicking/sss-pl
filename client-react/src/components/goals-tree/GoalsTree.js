import { connect } from 'react-redux'
import { GoalsTreeView } from './GoalsTreeView'
import { goalHelper } from '../../core'

const mapStateToProps = (state, ownProps) => {

  const processGoal = (goal) => {
    const result = {goal, children: []}
    state.goals.forEach((currGoal) => {
      if (currGoal.parentId === goal.id) {
        result.children.push(processGoal(currGoal))
      }
    })
    return result
  }

  const goalsTree = processGoal(goalHelper.create({id: 0, name: 'root'}))

  console.log(goalsTree)

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

