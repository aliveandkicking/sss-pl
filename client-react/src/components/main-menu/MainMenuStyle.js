// import { theme } from '../styles'

export const mainMenuStyles = {
  root: {
    backgroundColor: `green`,
    position: 'fixed',
    zIndex: '1',
    left: '0px',
    top: '0px',
    bottom: '0px',
    transition: '500ms'
  },
  rootExpanded: {
    width: '240px'
  },
  rootColapsed: {
    width: '40px'
  },
  body: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    backgroundColor: 'purple',
    height: '40px'

  }
}
