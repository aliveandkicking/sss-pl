import { theme } from '../styles'

const button = {
  cursor: 'pointer',
  // border: '1px solid red',
  transition: '200ms',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

export const navigationHeaderStyles = {
  root: {
    backgroundColor: theme.colorB,
    flex: 1,
    height: '42px',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    color: theme.colorHeaderText,
    userSelect: 'none',
    fontFamily: theme.fontFamily
  },
  dateCaption: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'default',
  },
  rightButtonGroupContainer: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  },
  button: {
    ...button,
    width: '42px'
  },
  todayButton: {
    ...button,
    width: '75px'
  },
  buttonHover: {
    backgroundColor: theme.colorA
  },
  addButtonSymbol: {
    transform: 'scale(2, 2)'
  },
  navigationButtonSymbol: {
    transform: 'scale(1, 1.5)'
  }
}
