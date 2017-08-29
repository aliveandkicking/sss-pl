import React from 'react'
import { mainMenuStyles as styles } from './MainMenuStyle'

export const MainMenuView = ({ visible }) => {

  console.log(visible)

  return (
    <div style={Object.assign({}, styles.root,
      visible ? styles.rootExpanded : styles.rootColapsed)}>
      <div style={styles.body}>
        <div style={styles.header}>
          <span>
            X
          </span>

        </div>
      </div>



      <span>

      </span>
    </div>
  )
}