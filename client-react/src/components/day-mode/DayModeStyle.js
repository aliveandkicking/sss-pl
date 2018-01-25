import { theme } from '../styles'

export const dayModeStyles = {
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: 1,
    display: 'flex',
    overflowY: 'auto'
  },
  additionalInfo: {
    marginTop: '21px',
    // border: '1px solid #888',
    width: '85%',
    display: 'flex',
  },
  vocabularyContainer: {
    flex: 1,
    // border: '1px solid yellow',
    borderRadius: '3px',
    margin: '10px',
    backgroundColor: 'rgba(50,50,50,0.5)',
    padding: '10px'
  },
  vocabularyItemContainer: {
    backgroundColor: theme.colorB,
    margin: '5px',
    padding: '5px 72px 5px 5px',
    borderRadius: '2px',
    position: 'relative'
  },
  vocabularyItemContainerToday: {
    backgroundColor: theme.colorC
  },
  vocabularyDate: {
    color: '#aaa',
    position: 'absolute',
    fontSize: '11px',
    top: '2px',
    right: '2px'
  },
  notesContainer: {
    flex: 1,
    // border: '1px solid yellow',
  }
}
