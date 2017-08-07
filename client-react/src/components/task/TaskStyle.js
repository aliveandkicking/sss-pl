export const taskStyles = {
  root:{
    border: '1px solid orange',
    flex: 1,
    userSelection: 'none',
    cursor: 'pointer',
  },
  selectedRoot:{
    ...this.root,
    backgroundColor: 'green'
  }
}