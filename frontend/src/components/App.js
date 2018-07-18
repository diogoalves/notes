import React, { Component } from 'react';

import withRoot from './withRoot';

class App extends Component {
  render() {
    return <div>Hi</div>;
  }
}

export default withRoot(App);
