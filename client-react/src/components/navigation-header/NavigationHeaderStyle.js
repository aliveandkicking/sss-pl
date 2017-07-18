const buttonDef = {
  height: '30px',
  cursor: 'pointer',
  backgroundColor: '#cfc',
  margin: '0px 5px'
}

export const navigationHeaderStyles = {
  root:{
    border: '1px solid brown',
    flex: 1,
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightButtonGroupContainer: {

  },
  button: {
    ...buttonDef,
    width: '30px'
  },
  todayButton: {
    ...buttonDef,
    width: '100px'
  }

}