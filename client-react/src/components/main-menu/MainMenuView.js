import React from 'react'
import { mainMenuStyles as styles } from './MainMenuStyle'
import { CustomSpan } from '..'

export const MainMenuView = ({
  expanded,
  onChangeExpandedState,
  onNewTask,
  onShowTaskList,
  onShowWeek
}) => {

  const getItem = (iconSymbol, text, action) => {
    return(
      <CustomSpan
        style={styles.item}
        styleHover={styles.itemHover}
        onClick={e => {
          onChangeExpandedState(false)
          action()
          }}>
        <span style={styles.itemIcon}>
        {iconSymbol}
        </span>
        <span style={styles.itemCaption}>
          {text}
        </span>
      </CustomSpan>
    )
  }

  return (
    <div style={Object.assign({}, styles.root,
      expanded ? styles.rootExpanded : styles.rootColapsed)}
      onClick={e => onChangeExpandedState(!expanded)}>

      <div style={Object.assign({}, styles.body,
        expanded ? styles.bodyExpanded : styles.bodyColapsed)}
        onClick={e => e.stopPropagation()}>

        <div style={styles.header}>
          <CustomSpan
            style={styles.mainMenuButton}
            styleHover={styles.mainMenuItemHover}
            onClick={e => onChangeExpandedState(!expanded)}>
          &#9776;
          </CustomSpan>
        </div>

        <div style={styles.group}>
          {getItem('+', 'New Task', onNewTask)}
          {getItem('▤', 'Task List', onShowTaskList)}
          {getItem('Ⓦ', 'Week', onShowWeek)}
        </div>

      </div>
    </div>
  )
}