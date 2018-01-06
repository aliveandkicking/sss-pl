import { theme } from '../styles'

export const goalsTreeStyles = {
  root: {
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
