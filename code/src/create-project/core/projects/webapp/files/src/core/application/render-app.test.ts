import * as assert from 'assert';
import * as sinon from 'sinon';

import renderApp from './render-app';


describe('core/applicatin/render-app', () => {

  it('Should call facade.create with facade.App', () => {
    const createFake = sinon.fake();
    const App = { id: Date.now() };

    renderApp({
      render: () => null,
      create: createFake,
      document: { getElementById: () => null },
      App
    });

    assert(createFake.calledWith(App));
  });

  it('Should call facade.document.getElementById with "app"', () => {
    const documentFake = { getElementById: sinon.fake() };

    renderApp({
      render: () => null,
      create: () => null,
      document: documentFake,
      App: {}
    });

    assert(documentFake.getElementById.calledWith('app'));
  });

  it('Should render created component App into element with id=app', () => {
    const renderFake = sinon.fake();
    const App = { id: Date.now() };
    const CREATED_COMPONENT = 'created-component';
    const DOM_ELEMENT = 'dom-element';

    renderApp({
      render: renderFake,
      create: component => component === App ? CREATED_COMPONENT : null,
      document: { getElementById: id => id === 'app' ? DOM_ELEMENT : null },
      App
    });

    assert(renderFake.calledWith(CREATED_COMPONENT, DOM_ELEMENT));
  });
});
