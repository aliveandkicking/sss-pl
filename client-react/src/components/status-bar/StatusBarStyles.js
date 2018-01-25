import { theme } from '../styles'

export const statusBarStyles = {
  root: {
    alignItems: 'flex-start',
    backgroundColor: theme.colorC,
    boxShadow: '0px -1px 2px #333',
    display: 'flex',
    height: '36px',
    justifyContent: 'center',
    userSelect: 'none',
    zIndex: 1,
    position: 'relative',
    padding: '10px'
  },
  statusLabel: {
    position: 'absolute',
    marginRight: '12px',
    color: '#bbb',
    right: '0px',
    bottom: '2px',
    alignText: 'end',
    fontSize: '12px'
  },
  goal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CB824B',
    borderRadius: '2px',
    padding: '3px 12px',
    margin: '0px 5px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden'
  },
  goalLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8C600C',
    borderRadius: '2px',
    marginLeft: '10px',
    width: '20px',
    height: '20px',
    fontSize: '75%'
  }
}
