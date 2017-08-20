import { theme } from '../../styles/theme'

export const editCustomDatesStyles = {
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  customDatesContainer: {
    backgroundColor: '#eee',
    padding: '2px',
    margin: '2px',
    flex: 1
  },
  customDate: {
    backgroundColor: theme.colorB,
    padding: '4px',
    margin: '2px',
    fontSize: '12px'
  },
  deleteCustomDateButton: {
    width: '10px',
    height: '10px',
    borderRadius: '5px',
    backgroundColor: theme.colorA,
    transition: '300ms'
  },
  deleteCustomDateButtonHover: {
    backgroundColor: theme.colorE
  }
}
