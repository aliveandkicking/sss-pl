import React, { Component } from 'react'
import { Week } from './components'
import { EditTask } from './components';
import { store, state } from './store';

class App extends Component {
  constructor(props) {
    super(props)
    this.unsubscribe = store.subscribe(() =>
      console.log(state())
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
