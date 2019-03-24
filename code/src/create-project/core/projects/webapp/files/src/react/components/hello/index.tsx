import * as React from 'react';
import OnionContext from 'onion-context';

import CurrentTimetampOnionContext from 'react/onion-contexts/current-timestamp';

import sayHello from 'core/domain/say-hello';


const Hello = (props) => (
  <React.Fragment>
    <h1>{sayHello()}</h1>

    <p>Your current timestamp: {props.currentTimestampContext.timestamp}</p>

    <button type='button' onClick={props.currentTimestampContext.update}>update</button>
  </React.Fragment>
);


export default OnionContext.attachConsumers(
  CurrentTimetampOnionContext.consumerContainer
)(Hello);
