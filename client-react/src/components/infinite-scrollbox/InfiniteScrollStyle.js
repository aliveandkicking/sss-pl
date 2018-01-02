export const rootStyles = {
  sizeInitnializer: {
    minWidth: '100%'
  },
  root: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    overflowX: 'hidden',
    overflowY: 'hidden',
    scrollBehavior: 'instant',
  },
  scrollableContent: {
    position: 'relative'
  },
  visibleContent: {
    display: 'flex',
    alignItems: 'stretch',
    position: 'absolute',
    top: '0px',
    bottom: '0px'
  },
  elementContainer: {
    flex: 1,
    overflow: 'hidden'
  }
}
