import * as React from 'react';
import OnionContext from 'onion-context';


class CurrentTimestampContextState extends OnionContext.contextStateFactory(React.Component) {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: Date.now()
    }
  }

  update() {
    this.setState({ timestamp: Date.now() });
  }

  exportContextState() {
    return {
      update: this.update.bind(this),
      ...this.state
    };
  }
}


export default OnionContext.onionContextFactory({
  name: 'currentTimestampContext',
  state: CurrentTimestampContextState,
  context: React.createContext({}),
  renderLib: React
});
