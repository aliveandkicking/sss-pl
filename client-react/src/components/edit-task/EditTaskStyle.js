export const editTaskStyles = {
  root:{
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    userSelect: 'none'
  },
  dialog: {
    height: '500px',
    width: '400px',
    backgroundColor: '#ccc',
    border: '2px solid yellow',
  },
    tabs: {
    display: 'flex',
    alignItems: 'stretch',
    cursor: 'pointer'
  },
  tab: {
    flex: 1
  },
  dayOfWeek:{
    // color: 'yellow'
    cursor: 'pointer'
  },
  selectedDayOfWeek:{
    cursor: 'pointer',
    color: 'yellow'
  },
  monthlyDayOfTheLastWeekSelected: {
    cursor: 'pointer',
    color: 'yellow'
  }
}
