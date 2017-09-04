import { theme } from '../styles'

const addButton = {
  backgroundColor: theme.colorC,
  borderRadius: '3px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  margin: '2px 1px',
  transition: '500ms',
  opacity: '0.3'
}

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
    height: '30px',
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  addTaskButton: {
    flex: 4,
    ...addButton
  },
  quickAddTaskButton: {
    flex: 1,
    fontSize: '8px',
    ...addButton
  },

  addTaskButtonHover: {
    opacity: 1
  }
}
