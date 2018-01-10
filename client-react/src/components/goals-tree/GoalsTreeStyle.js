import { theme } from '../styles'

const connectionColor = '#779'
const connectionLine = '2px solid ' + connectionColor
const connectionWidth = '20px'
export const taskHeight = 40

export const goalsTreeStyles = {
  root: {
    fontFamily: theme.fontFamily,
    color: theme.colorText,
    height: 'calc(100% - 7px)',
    flexWrap: 'nowrap',
    margin: '5px 10px 2px',
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
    flexDirection: 'column',
    alignItems: 'stretch',
    width: connectionWidth
  },
  connectionTop: {
    flex: 1,
    borderLeft: connectionLine
  },
  connectionBottom: {
    flex: 1,
    borderTop: connectionLine,
    borderLeft: connectionLine
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
    border: connectionLine
  },
  childrenContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  tasksContainer: {
    display: 'flex',
    border: connectionLine,
    padding: '1px'
  },
  taskContainer: {
    width: '60px',
    height: taskHeight + 'px',
    display: 'flex',
    alignItems: 'stretch'
  },
  task: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colorC,
    margin: '1px'
  }
}
