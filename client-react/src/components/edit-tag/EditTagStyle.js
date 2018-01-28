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
    MozUserSelect: 'none',
    zIndex: '3',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    overflow: 'hidden'
  },
  dialog: {
    height: '140px',
    width: '300px',
    background: theme.colorC,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '10px 15px 10px',
    marginBottom: '300px',
    marginRight: theme.mainMenuCollapsedWidth,
    borderRadius: '2px'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30px',
    borderBottom: '1px solid rgba(200,200,200,0.3)',
    marginBottom: '10px',
    position: 'relative',
    paddingBottom: '10px'
  },
  closeButton: {
    position: 'absolute',
    right: '0px',
    top: 'auto',
    bottom: 'auto',
    cursor: 'pointer'
  },
  closeButtonHover: {
    color: theme.colorTextHover
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '6px',
    cursor: 'pointer'
  },
  input: {
    width: '70px'
  }
}
