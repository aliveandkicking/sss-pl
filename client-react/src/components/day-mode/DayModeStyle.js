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
    // marginTop: '21px',
    // border: '1px solid #888',
    width: '50%',
    display: 'flex',
  },
  vocabularyContainer: {
    flex: '1',
    // border: '1px solid yellow',
    borderRadius: '3px',
    margin: '10px 5px 10px 10px',
    // backgroundColor: 'rgba(0,0,0,0.2)',
    backgroundColor: theme.colorB,
    padding: '10px',
    display: 'flex',
    flexDirection: 'column'
  },
  vocabularyItemContainer: {
    backgroundColor: theme.colorC,
    margin: '5px',
    padding: '12px',
    borderRadius: '2px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  vocabularyItemContainerToday: {
    backgroundColor: theme.colorA
  },
  vocabularyDate: {
    color: '#bbb',
    fontSize: '11px',
    width: '80px'
  },
  popup: {
    flex: 'auto',
    backgroundColor: theme.colorC,
    margin: '5px',
    padding: '10px',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
