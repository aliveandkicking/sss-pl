import { theme } from '../styles'

export const goalsTreeStyles = {
  root: {
    background: `linear-gradient(-30deg, ${theme.colorC}, ${theme.colorE})`,
    fontFamily: theme.fontFamily,
    color: theme.colorText,
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: 1,
    overflowY: 'auto'
  }
}
