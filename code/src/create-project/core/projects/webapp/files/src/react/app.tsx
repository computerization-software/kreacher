import * as React from "react";
import OnionContext from 'onion-context';

import CurrentTimestampOnionContext from 'react/onion-contexts/current-timestamp';

import Hello from 'react/components/hello';


// define app structure
const App = () => (
  <Hello />
)

// define onion context providers for App
const onionContextProviders = [
  CurrentTimestampOnionContext.providerContainer
];


export default OnionContext.attachProviders(...onionContextProviders)(App);
