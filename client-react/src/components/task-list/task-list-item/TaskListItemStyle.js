export const taskListItemStyles = {
  root: {
    height: '60px',
    borderBottom: '1px solid rgba(200,200,200,0.1)',
    cursor: 'pointer',
    userSelect: 'none',
    MozUserSelect: 'none',
    position: 'relative'
  },
  rootHover: {
    boxShadow: 'inset 0px 0 20px rgba(0,0,0,0.8)'
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  name: {
    flex: 1,
    padding: '3px 10px',
    display: 'flex',
    alignItems: 'center'
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: '5px 10px',
    fontSize: '12px'
  },
  markersConstainer: {
    position: 'absolute',
    right: '20px',
    top: '0px',
    bottom: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  marker: {
    fontSize: '45px'
  },
  markerInactiveActive: {
    color: 'rgba(200,200,200,0.1)'
  }
}
