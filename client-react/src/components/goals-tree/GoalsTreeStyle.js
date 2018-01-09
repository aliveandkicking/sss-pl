import { theme } from '../styles'

const connectionLine = '1px solid #ddd'
const connectionWidth = '20px'

export const goalsTreeStyles = {
  root: {
    fontFamily: theme.fontFamily,
    color: theme.colorText,
    height: 'calc(100% - 2px)',
    flexWrap: 'nowrap',
    marginBottom: '2px',
    cursor: 'default',
    userSelect: 'none'
  },
  content: {
    // backgroundColor: 'rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '0px',
    left: '0px',
    minWidth: '100%',
    minHeight: '100%'
  },
  node: {
    display: 'flex',
    minHeight: '70px'
  },
  connectionsContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  connectionTop: {
    flex: 1,
    borderLeft: connectionLine,
    width: connectionWidth
  },
  connectionBottom: {
    flex: 1,
    borderTop: connectionLine,
    borderLeft: connectionLine,
    width: connectionWidth
  },
  connectionAfter: {
    borderBottom: connectionLine,
    width: connectionWidth,
    alignSelf: 'center'
  },
  nodeContentContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  goal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(50,50,75,0.7)',
    width: '170px',
    height: '60px',
    border: '1px solid #aaa'
  },
  childrenContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  task: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(50,50,50,0.7)',
    width: '60px',
    height: '40px',
    border: '1px solid #aaa'
  }
}
