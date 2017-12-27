const taskInfoItem = {
  textAlign: 'center',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  top: '0px',
  bottom: '0px',
  left: '3px',
  right: '3px',
  transition: '500ms'
}

export const taskStyles = {
  root: {
    margin: '1px',
    cursor: 'pointer',
    position: 'relative',
    flex: 1,
    height: '55px',
    minWidth: '75px',
    overflow: 'hidden',
    transition: '400ms',
    userSelect: 'none'
  },
  content: {
    borderRadius: '2px',
    position: 'relative',
    height: '100%',
    width: '100%',
    transition: '200ms',
    backgroundColor: '#99d'
  },
  contentHover: {
    boxShadow: 'inset 0px 0px 1px rgba(255,255,255,1)'
  },
  contentSelected: {
    opacity: 0.2
  },
  tagMark: {
    height: '8px',
    width: '8px',
    borderRadius: '5px',
    overflow: 'hidden',
    position: 'absolute',
    left: '4px',
    top: '4px',
    transition: '200ms',
    zIndex: 1,
    border: '1px solid rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  tagMarkHover: {
    backgroundColor: 'rgba(255,255,255,0.4)'
  },
  removeButton: {
    fontSize: '12px',
    height: '18px',
    opacity: 0.25,
    overflow: 'hidden',
    position: 'absolute',
    right: '6px',
    top: '0px',
    transition: '400ms',
    zIndex: 1
  },
  removeButtonHover: {
    opacity: 1
  },
  taskName: {
    ...taskInfoItem,
    opacity: 0,
    fontSize: '60%'
  },
  taskNameHover: {
    opacity: 1
  },
  taskAbbr: {
    ...taskInfoItem
  },
  taskAbbrHover: {
    opacity: 0
  },
  editButton: {
    position: 'absolute',
    bottom: '3px',
    left: '3px',
    height: '18px',
    opacity: 0.25,
    transition: '400ms',
    overflow: 'hidden',
    zIndex: 1
  },
  editButtonHover: {
    opacity: 1
  },
  progressBar: {
    height: '15px',
    width: '50px',
    position: 'absolute',
    bottom: '0px',
    right: '4px',
    opacity: 0.4,
    transition: '400ms',
    fontSize: '11px',
    textAlign: 'right'
  },
  progressBarHover: {
    opacity: 1
  },
  checkMark: {
    height: '6px',
    width: '11px',
    position: 'absolute',
    bottom: '8px',
    right: '4px',
    opacity: 0,
    borderLeft: '2px solid white',
    borderBottom: '2px solid white',
    transform: 'rotate(-60deg) skewX(-10deg) '
  },
  checkMarkCheked: {
    opacity: 0.7
  }
}
