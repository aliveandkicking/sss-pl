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
    alignContent: 'flex-start',
    position: 'relative'
  },
  addTaskRow: {
    height: '30px',
    minWidth: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  addTaskButton: {
    flex: 4,
    ...addButton
  },
  quickAddTaskButton: {
    fontSize: '10px',
    width: '20px',
    ...addButton
  },
  addTaskButtonHover: {
    opacity: 1
  },
  quickAddDialog: {
    position: 'absolute',
    height: '50px',
    width: '220px',
    top: '30px',
    zIndex: 2
  },
  quickAddDialogLeftSide: {
    left: '0px'
  },
  quickAddDialogRightSide: {
    right: '0px'
  },
  quickAddDialogBackground: {
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    position: 'fixed'
  },
  quickAddDialogContent: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colorC,
    boxShadow: '1px 1px 10px #333',
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center'
  },
  quickAddDialogInput: {
    width: '0px',
    flex: 1,
    marginLeft: '10px'
  },
  quickAddDialogAddButton: {
    margin: '0px 10px',
    userSelect: 'none',
    cursor: 'pointer',
    transition: '200ms'
  },
  quickAddDialogAddButtonHover: {
    color: theme.colorTextHover
  }
}
