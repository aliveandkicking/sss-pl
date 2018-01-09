import { theme } from '../styles'

export const goalsTreeStyles = {
  root: {
    fontFamily: theme.fontFamily,
    color: theme.colorText,
    height: 'calc(100% - 2px)',
    flexWrap: 'nowrap',
    marginBottom: '2px'
  },
  content: {
    // backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '0px',
    left: '0px',
    minWidth: '100%',
    minHeight: '100%'
  }
}
