export const calendarStyles = {
  root:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    userSelect: 'none',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    userSelect: 'none',
    cursor: 'pointer'
  },
  body:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '20px'
  },
  cell: {
    flex: '1',
    border: '1px solid grey',
    cursor: 'pointer'
  }
}
