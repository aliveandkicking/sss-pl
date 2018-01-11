import { theme } from '../../styles'

const goalButton = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  borderRadius: '2px',
  opacity: 0.5,
  transition: '400ms'
}

export const goalsStyles = {
  goal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'rgba(50,50,75,0.7)',
    width: '182px',
    height: '60px',
    border: '2px solid #779',
    cursor: 'pointer',
    transition: '200ms',
    position: 'relative'
  },
  backgroundInEditMode: {
    position: 'fixed',
    left: '0px',
    top: '0px',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(50,50,50,0.6)',
    zIndex: 1
  },
  editGoalButton: {
    ...goalButton,
    bottom: '2px',
    left: '2px'
  },
  checkBoxGoalButton: {
    ...goalButton,
    bottom: '2px',
    right: '2px'
  },
  goalButtonHover: {
    opacity: 1
  },
  goalName: {
    flex: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  goalNameInput: {
    flex: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: '#fff',
    borderWidth: '0px',
    fontFamily: theme.fontFamily
  },
  goalHover: {
    border: '2px solid #aaa'
  }
}