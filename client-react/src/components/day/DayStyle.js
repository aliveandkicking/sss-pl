import { theme } from '../styles'

export const dayStyles = {
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: '0px 2px'
  },
  caption: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '25px',
    fontSize: '75%',
    userSelect: 'none',
    cursor: 'default'
  },
  content: {
    flex: '1',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
  },
  addTaskRow: {
    height: '40px',
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  addTaskButton: {
    backgroundColor: theme.colorC,
    height: '30px',
    width: '30px',
    borderRadius: '15px',
    marginRight: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    transition: '500ms',
    opacity: '0.4'
  },

  addTaskButtonHover: {
    opacity: 1,
    boxShadow: 'inset 0px 0 5px rgba(0,0,0,0.6)'
  }
}
