import { theme } from '../styles/theme'

export const editTagStyles = {
  root: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: theme.minWidth,
    minHeight: theme.minContentHeight,
    backgroundColor: 'rgba(0,0,0,0.3)',
    userSelect: 'none',
    zIndex: '3',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    overflow: 'hidden'
  },
  dialog: {
    height: '200px',
    width: '300px',
    background: theme.colorC,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '10px 15px 10px',
    marginRight: theme.mainMenuCollapsedWidth
  }
}
