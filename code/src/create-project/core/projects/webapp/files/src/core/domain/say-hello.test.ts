import * as assert from 'assert';

import sayHello from './say-hello';


describe('sayHello', () => {

  it('Should return "hello!"', () => {
    assert.strictEqual(sayHello(), 'hello!');
  });
});
