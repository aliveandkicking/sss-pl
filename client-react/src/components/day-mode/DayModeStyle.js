import { theme } from '../styles'

export const dayModeStyles = {
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '10px'
  },
  content: {
    flex: '1',
    display: 'flex',
    overflowY: 'auto'
  },
  additionalInfo: {
    width: '40%',
    display: 'flex'
  },
  vocabularyContainer: {
    flex: '1',
    borderRadius: '3px',
    margin: '0px 5px 10px 10px',
    backgroundColor: theme.colorB,
    padding: '10px',
    display: 'flex',
    flexDirection: 'column'
  },
  vocabularyItemContainer: {
    backgroundColor: theme.colorC,
    minHeight: '30px',
    margin: '5px',
    padding: '12px',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  vocabularyItemContainerToday: {
    backgroundColor: theme.colorA
  },
  vocabularyDate: {
    color: '#bbb',
    fontSize: '11px',
    width: '80px',
    textAlign: 'end'
  },
  popup: {
    flex: 'auto',
    backgroundColor: theme.colorC,
    margin: '5px',
    padding: '10px',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }
}
