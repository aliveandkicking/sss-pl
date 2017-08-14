import { theme } from '../styles';

const buttonEdge = '30px'

const buttonDef = {
  height: buttonEdge,
  cursor: 'pointer'
}

export const navigationHeaderStyles = {
  root:{
    backgroundColor: theme.colorB,
    flex: 1,
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightButtonGroupContainer: {

  },
  buttonAdd: {
    ...buttonDef,
    width: '30px',
    fontSize: '500px'
  },
  todayButton: {
    ...buttonDef,
    width: '100px',
  },
  todayButtonHover: {
    ...buttonDef,
    width: '100px',
    backgroundColor: theme.colorA
  }
}