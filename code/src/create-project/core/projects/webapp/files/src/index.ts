import * as React from "react";
import * as ReactDOM from "react-dom";

import renderApp from 'core/application/render-app';
import App from 'react/app';

renderApp({
  render: ReactDOM.render,
  create: React.createElement,
  document: window.document,
  App
});
