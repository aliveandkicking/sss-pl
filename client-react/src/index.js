import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/App'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// removing ads
setTimeout(() => {
  document.body.childNodes.forEach(el => {
    if (el.tagName) {
      if (el.tagName.toLowerCase() === 'div') {
        if (el.id !== 'root') {
          document.body.removeChild(el)
          console.log('removed element ', el)
        }
      }
    }
  })
}, 10);
