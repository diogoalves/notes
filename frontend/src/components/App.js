import React, { Component } from 'react';
import TopBar from './TopBar';
import MyEditor from './MyEditor';
import Notifications from './Notifications';
import withRoot from './withRoot';

class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <MyEditor />
        <Notifications />
      </div>
    );
  }
}

export default withRoot(App);
