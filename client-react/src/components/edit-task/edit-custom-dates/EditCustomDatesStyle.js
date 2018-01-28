import { theme } from '../../styles/theme'

export const editCustomDatesStyles = {
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    userSelect: 'none',
    MozUserSelect: 'none',
    cursor: 'default',
    paddingBottom: '10px',
    borderBottom: '1px solid rgba(200,200,200,0.3)'
  },
  header: {
    padding: '8px 0px',
    marginBottom: '10px',
    borderBottom: '1px solid rgba(200,200,200,0.3)'
  },
  backButton: {
    transition: '300ms',
    cursor: 'pointer',
    display: 'flex',
    width: '150px'
  },
  backButtonHover: {
    color: theme.colorTextHover
  },
  backButtonSymbol: {
    margin: '0px 5px 3px 0px',
    transform: 'scale(0.8, 1.3)'
  },
  customDatesContainer: {
    backgroundColor: '#eee',
    padding: '1px',
    margin: '1px 0px 5px',
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    overflowY: 'auto',
    overflowX: 'hide',
    borderRadius: '2px'
  },
  customDate: {
    backgroundColor: theme.colorB,
    padding: '3px 6px',
    margin: '1px',
    fontSize: '12px',
    height: '15px',
    width: '116px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '4px'
  },
  customDateDayName: {
    color: theme.colorD
  },
  deleteCustomDateButton: {
    width: '14px',
    height: '14px',
    borderRadius: '7px',
    backgroundColor: theme.colorA,
    transition: '300ms',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    cursor: 'pointer'
  },
  deleteCustomDateButtonHover: {
    backgroundColor: theme.colorE
  },
  deleteCustomDateButtonSymbol: {
    transform: 'scale(0.8, 0.7)'
  }
}
