import { theme } from '../styles'

export const rootStyles = {
  root: {
    background: `linear-gradient(-30deg, ${theme.colorC}, ${theme.colorE})`,
    fontFamily: theme.fontFamily,
    color: theme.colorText,
    height: '100%',
    minWidth: theme.minContentWidth,
    minHeight: theme.minContentHeight,
    marginLeft: theme.mainMenuCollapsedWidth,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    overflowY: 'auto'
  }
}
