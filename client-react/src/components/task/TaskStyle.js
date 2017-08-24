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
    height: '65px',
    minWidth: '75px',
    overflow: 'hidden',
    transition: '400ms',
    userSelect: 'none'
  },
  content: {
    position: 'relative',
    height: '100%',
    width: '100%',
    transition: '400ms'
  },
  contentHover: {
    boxShadow: 'inset 0px 0 8px rgba(0,0,0,0.6)'
  },
  contentSelected: {
    opacity: 0.2
  },
  removeButton: {
    fontSize: '12px',
    height: '18px',
    margin: '0px 3px 3px',
    opacity: 0.25,
    overflow: 'hidden',
    position: 'absolute',
    right: '3px',
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
    fontSize: '70%'
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
  footer: {
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    height: '18px',
    opacity: 0.25,
    transition: '400ms',
    margin: '0px 3px 3px',
    overflow: 'hidden',
    zIndex: 1
  },
  footerHover: {
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
