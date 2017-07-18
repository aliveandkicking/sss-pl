import React, { Component } from 'react'
import { Week } from './components'
import { EditTask } from './components';

class App extends Component {
  constructor(props) {
    super(props)
    const store = props.store
    this.unsubscribe = store.subscribe(() =>
      console.log(store.getState())
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <div>
        <EditTask />
        <Week />
      </div>
    );
  }
}

export default App;
