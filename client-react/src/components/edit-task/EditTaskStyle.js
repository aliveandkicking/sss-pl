import { theme } from '../styles/theme';

const tab = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '27px',
  textTransform: 'capitalize'
}

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

const tabBorder = '1px solid #aaa'

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
    zIndex: '2',
  },
  dialog: {
    height: '600px',
    width: '420px',
    background: theme.colorC,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '10px 15px 20px'
  },
  header: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  caption:{
    transition: '300ms',
    cursor: 'pointer',
  },
  captionHover:{
    color: theme.colorTextHover,
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
    marginTop: '10px',
  },
  tab: {
    ...tab,
    borderBottom: tabBorder,
    color: '#aaa'
  },
  tabSelected: {
    ...tab,
    borderBottom: 'none',
    borderTop: tabBorder,
    borderRight: tabBorder,
    borderLeft: tabBorder,
    color: theme.colorText
  },
  rules: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  ruleRow: {
    height: '35px',
    display: 'flex',
    alignItems: 'center'
  },
  ruleLabel: {
    width: '158px',
    textAlign: 'right'
  },
  ruleInput: {
    width: '140px',
    marginLeft: '7px',
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
  dayOfWeekSelected:{
    color: theme.colorText,
    borderBottom: `2px solid ${theme.colorD}`
  },
  dayOfWeekRangeButtonMonToFri:{
    ...dayOfWeekRangeButton,
    marginLeft: '8px',
    backgroundColor: theme.colorText
  },
  dayOfWeekRangeButtonSaSu:{
    ...dayOfWeekRangeButton,
    marginLeft: '5px',
    backgroundColor: theme.colorText
  },
  dayOfWeekRangeButtonHover:{
    backgroundColor: theme.colorTextHover,
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
  customDatesRuleText:{
    fontSize: '13px',
    marginLeft: '7px',
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
  }

}
