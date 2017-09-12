import { theme } from '../styles'

export const statusBarStyles = {
  root: {
    alignItems: 'center',
    backgroundColor: theme.colorC,
    boxShadow: '0px -1px 2px #333',
    display: 'flex',
    height: '25px',
    justifyContent: 'flex-end',
    userSelect: 'none',
    zIndex: 1
  },
  statusLabel: {
    marginRight: '7px',
    color: '#bbb'
  }
}
