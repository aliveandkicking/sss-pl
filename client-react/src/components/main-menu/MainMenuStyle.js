import { theme } from '../styles'

export const mainMenuStyles = {
  root: {
    backgroundColor: `rgba(0,0,0,0.2)`,
    position: 'fixed',
    zIndex: 1,
    left: '0px',
    top: '0px',
    bottom: '0px',
    userSelect: 'none',
    overflow: 'visible'
  },
  rootExpanded: {
    width: '100%'
  },
  rootColapsed: {
    width: theme.mainMenuCollapsedWidth
  },
  body: {
    backgroundColor: theme.colorB,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: '200ms',
    boxShadow: '1px 0px 8px #333',
    overflow: 'hidden'
  },
  bodyExpanded: {
    width: '250px'
  },
  bodyColapsed: {
    width: theme.mainMenuCollapsedWidth
  },
  header: {
    height: theme.mainMenuCollapsedWidth,
    display: 'flex',
    alignItems: 'center'
  },
  mainMenuButton: {
    fontSize: '26px',
    cursor: 'pointer',
    textAlign: 'center',
    width: theme.mainMenuCollapsedWidth,
    transition: '300ms'
  },
  mainMenuItemHover: {
    color: theme.colorTextHover
  },
  group: {
    flex: 1,
    borderTop: '1px solid rgba(200,200,200,0.3)',
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    minWidth: '250px'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    height: theme.mainMenuCollapsedWidth,
    cursor: 'pointer'
  },
  itemHover: {
    backgroundColor: theme.colorE
  },
  itemIcon: {
    fontSize: '34px',
    width: theme.mainMenuCollapsedWidth,
    textAlign: 'center',
    margin: '0px 11px 4px 0px'
  },
  itemCaption: {
    flex: 1
  }
}
