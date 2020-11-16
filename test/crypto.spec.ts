import { assert } from 'chai';
import 'mocha';

import * as cipher from '@src/utils/crpyto';

const tests = [
  '160000000',
  '170000000',
  '123456789',
  'abcdef123456',
  '홍길동'
]

describe(__filename, () => {
  tests.forEach((test) => {
    it(test, () => {
      const encrypted = cipher.encrypt(test);
      console.log(test, encrypted);
      const decrypted = cipher.decrypt(encrypted);
      assert.equal(decrypted, test);
    })
  })
});
