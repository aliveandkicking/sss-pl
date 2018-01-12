import { theme } from '../../styles'

export const dimensions = {
  width: 182,
  height: 60,
  outerControlsWidth: 100,
  outerControlsHeight: 100
}

const innerButton = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  borderRadius: '2px',
  opacity: 0.4,
  transition: '400ms'
}

const outerButton = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2px',
  transition: '300ms',
  cursor: 'pointer',
  zIndex: 3
}

export const goalsStyles = {
  root: {
    position: 'relative'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#274269',
    width: dimensions.width + 'px',
    height: dimensions.height + 'px',
    border: '2px solid #779',
    cursor: 'pointer',
    transition: '200ms',
    position: 'relative'
  },
  contentHover: {
    border: '2px solid #aaa',
    backgroundColor: '#30507F'
  },
  backgroundInEditMode: {
    position: 'fixed',
    left: '0px',
    top: '0px',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2
  },
  editButton: {
    ...innerButton,
    bottom: '2px',
    left: '2px'
  },
  checkMark: {
    ...innerButton,
    bottom: '2px',
    right: '2px'
  },
  innerButtonHover: {
    opacity: 1
  },
  name: {
    flex: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameInput: {
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
  outerButtonHover: {
    backgroundColor: theme.colorB
  },
  saveButton: {
    ...outerButton,
    position: 'absolute',
    left: '0px',
    height: '32px',
    width: '80px',
    fontSize: '80%',
    backgroundColor: theme.colorC
  },
  outerButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    width: dimensions.outerControlsWidth + 'px',
    height: '100px',
    fontSize: '80%',
  },
  outerButton: {
    ...outerButton,
    width: dimensions.outerControlsWidth + 'px',
    height: '25px',
    fontSize: '80%',
    backgroundColor: theme.colorD,
    margin: '2px'
  }
}
