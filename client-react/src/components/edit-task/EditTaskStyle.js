import { theme } from '../styles/theme'

const tab = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '27px',
  textTransform: 'capitalize'
}

const separator = '1px solid rgba(200,200,200,0.3)'

const dayOfWeekRangeButton = {
  marginTop: '4px',
  height: '14px',
  width: '14px',
  borderRadius: '7px',
  cursor: 'pointer',
  transition: '200ms',
  color: theme.colorE,
  fontSize: '70%',
  textAlign: 'center'
}

export const editTaskStyles = {
  root: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: theme.minWidth,
    minHeight: theme.minContentHeight,
    backgroundColor: 'rgba(0,0,0,0.3)',
    userSelect: 'none',
    zIndex: '3',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    overflow: 'hidden'
  },
  dialog: {
    height: '657px',
    width: '450px',
    background: theme.colorC,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '10px 15px 10px',
    marginRight: theme.mainMenuCollapsedWidth
  },
  header: {
    marginBottom: '10px',
    paddingBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: separator
  },
  caption: {
    transition: '300ms',
    cursor: 'pointer'
  },
  captionHover: {
    color: theme.colorTextHover
  },
  nameInputContainer: {
    height: '30px',
    display: 'flex',
    alignItems: 'stretch'

  },
  nameInput: {
    fontSize: '120%',
    fontWeight: 'bold',
    flex: 1
  },
  timesPerDaySymbol: {
    alignSelf: 'center',
    margin: '0px 5px'
  },
  timesPerDayInput: {
    fontSize: '120%',
    width: '40px',
    textAlign: 'center'
  },
  tabs: {
    display: 'flex',
    alignItems: 'stretch',
    cursor: 'pointer',
    marginTop: '10px'
  },
  tab: {
    ...tab,
    borderBottom: separator,
    color: '#aaa'
  },
  tabSelected: {
    ...tab,
    borderBottom: 'none',
    borderTop: separator,
    borderRight: separator,
    borderLeft: separator,
    color: theme.colorText
  },
  rules: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    borderBottom: separator
  },
  ruleRow: {
    height: '35px',
    display: 'flex',
    alignItems: 'center'
  },
  ruleLabel: {
    width: '170px',
    textAlign: 'right'
  },
  ruleInput: {
    width: '140px',
    marginLeft: '7px'
  },
  ruleEndsOn: {
    marginRight: '60px',
    height: '30px'
  },
  dayOfWeek: {
    cursor: 'pointer',
    fontSize: '13px',
    padding: '0px 2px',
    color: '#888'
  },
  dayOfWeekSelected: {
    color: theme.colorText,
    borderBottom: `2px solid ${theme.colorD}`
  },
  dayOfWeekRangeButtonMonToFri: {
    ...dayOfWeekRangeButton,
    marginLeft: '8px',
    backgroundColor: theme.colorText
  },
  dayOfWeekRangeButtonSaSu: {
    ...dayOfWeekRangeButton,
    marginLeft: '5px',
    backgroundColor: theme.colorText
  },
  dayOfWeekRangeButtonHover: {
    backgroundColor: theme.colorTextHover
  },
  monthlyRuleRow: {
    marginLeft: '45px'
  },
  monthlyDayOfTheLastWeek: {
    cursor: 'pointer',
    marginRight: '10px',
    color: '#888'
  },
  monthlyDayOfTheLastWeekSelected: {
    color: theme.colorText,
    borderBottom: `2px solid ${theme.colorD}`
  },
  customDatesRule: {
    borderBottom: separator,
    padding: '13px'
  },
  footer: {
    borderTop: separator,
    height: '25px',
    marginTop: '10px',
    padding: '10px 0px 0px',
    display: 'flex',
    alignItems: 'stretch',
    // justifyContent: 'space-between'
  },
  tagInput: {
    width: '120px',
    marginRight: '5px'
  },
  deleteButton: {
    display: 'flex',
    width: '75px',
    borderRadius: '2px',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    opacity: '0.4',
    padding: '4px',
    transition: '100ms',
    marginLeft: 'auto'
  },
  deleteButtonHover: {
    opacity: '1',
    backgroundColor: '#ff4d4d',
    boxShadow: '0px 0 3px rgba(0,0,0,0.6)'
  }
}
