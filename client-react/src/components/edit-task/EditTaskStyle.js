import { theme } from '../styles/theme';

const tab = {
  flex: 1,
  textAlign: 'center',
  textTransform: 'capitalize'
}

export const editTaskStyles = {
  root:{
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    userSelect: 'none',
    zIndex: '2'
  },
  dialog: {
    height: '550px',
    width: '400px',
    background: theme.colorC,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '10px'
  },
  header: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  caption:{
    transition: '300ms',
    cursor: 'pointer'
  },
  captionHover:{
    color: theme.colorTextHover
  },
  nameInput: {
    height: '25px',
    fontSize: '120%',
    fontWeight: 'bold'
  },
  tabs: {
    display: 'flex',
    alignItems: 'stretch',
    cursor: 'pointer',
    margin: '10px',
  },
  tab: {
    ...tab,
    borderBottom: '1px solid #ccc'
  },
  tabSelected: {
    ...tab,
    borderBottom: 'none',
    borderTop: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    borderLeft: '1px solid #ccc'
  },
  rules: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  ruleRow: {

  },
  ruleLabel: {

  },
  ruleInput: {
    
  },
  ruleEndsOn: {
    marginRight: '60px',
    height: '30px'
  },
  ruleWeeklyDays: {
    marginRight: '60px',
    height: '30px'
  },
  dayOfWeek: {
    cursor: 'pointer'
  },
  selectedDayOfWeek:{
    cursor: 'pointer',
    color: 'green'
  },
  monthlyDayOfTheLastWeekSelected: {
    cursor: 'pointer',
    color: 'yellow'
  }
}
