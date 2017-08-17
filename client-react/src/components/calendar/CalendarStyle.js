import { theme } from '../styles/theme';

const transition = '200ms'
const gridColor = 'rgba(255, 255, 255, 0.07)'

export const calendarStyles = {
  root:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    height: '300px',
    width: '300px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    userSelect: 'none',
    alignSelf: 'stretch',
    margin: '10px 5px'
  },
  caption: {
    transition,
    cursor: 'pointer',
  },
  navigationButton: {
    transform: 'scale(0.8, 1.3)',
    cursor: 'pointer',
    transition
  },
  hover: {
    color: theme.colorTextHover,
    transition
  },
  body:{
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
    borderBottom: `1px solid ${gridColor}`,
    borderRight: `1px solid ${gridColor}`,
  },
  row: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  cell: {
    flex: '1',
    borderLeft: `1px solid ${gridColor}`,
    borderTop: `1px solid ${gridColor}`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellGrayed: {
    color: '#999'
  },
  cellSelection: {
    backgroundColor: theme.colorD,
    color: theme.colorText
  },
  cellHover: {
    color: theme.colorE,
    fontWeight: 'bold',
  },
  todayButton: {
    transition,
    cursor: 'pointer',
    alignSelf: 'center',
    marginTop: '5px'
  }
}
