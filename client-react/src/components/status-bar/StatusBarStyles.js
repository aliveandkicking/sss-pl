import { theme } from '../styles'

export const statusBarStyles = {
  root: {
    backgroundColor: theme.colorC,
    boxShadow: '0px -1px 2px #333',
    // height: '50px',
    userSelect: 'none',
    MozUserSelect: 'none',
    zIndex: 1,
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  goalsContainer: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: '4px',
    borderBottom: '1px solid rgba(50,50,50,0.3)'
  },
  progressBarContainer: {
    backgroundColor: '#234b76',
    margin: '2px 200px 4px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '2px',
    position: 'relative'
  },
  progressBar: {
    position: 'absolute',
    backgroundColor: theme.colorD,
    width: '32%',
    borderRadius: '2px',
    left: '1px',
    top: '1px',
    bottom: '1px'
  },
  progressBarCaption: {
    margin: '1px',
    zIndex: 1,
    fontSize: '12px',
    color: '#bbe'
  },
  statusLabel: {
    position: 'absolute',
    marginRight: '4px',
    color: '#bbb',
    right: '0px',
    bottom: '5px',
    alignText: 'end',
    fontSize: '11px'
  },
  goal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#248f8f',
    borderRadius: '2px',
    padding: '3px 12px',
    margin: '0px 5px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden'
  },
  goalLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8C600C',
    borderRadius: '2px',
    marginLeft: '10px',
    width: '20px',
    height: '20px',
    fontSize: '75%'
  }
}
