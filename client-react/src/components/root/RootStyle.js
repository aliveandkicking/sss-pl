import { theme } from '../styles'

export const rootStyles = {
  root: {
    background: `linear-gradient(-30deg, ${theme.colorC}, ${theme.colorE})`,
    fontFamily: theme.fontFamily,
    color: theme.colorText,
    height: '100%',
    minWidth: '575px',
    marginLeft: '40px'
  }
}
