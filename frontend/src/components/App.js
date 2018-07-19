import React, { Component } from 'react';
import TopBar from './TopBar';
import MyEditor from './MyEditor';
import withRoot from './withRoot';

class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <MyEditor />
      </div>
    );
  }
}

export default withRoot(App);
