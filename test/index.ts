import * as chai from 'chai';

import { add } from '../src/index';

const expect = chai.expect;

describe('add', () => {
  it('should work', () => {
    const result = add(1, 1);
    expect(result).to.equal(2);
  });
});
