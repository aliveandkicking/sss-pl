import { theme } from '../styles'

const button = {
  cursor: 'pointer',
  transition: '200ms',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

export const navigationHeaderStyles = {
  root: {
    height: '42px',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    userSelect: 'none'
  },
  dateCaption: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'default',
    marginLeft: '50px'
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
    color: theme.colorTextHover
  },
  addButtonSymbol: {
    transform: 'scale(2, 2)'
  },
  navigationButtonSymbol: {
    transform: 'scale(1, 1.5)'
  }
}
