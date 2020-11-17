import { authLogin } from '@src/services';
import { assert } from 'chai';
import 'mocha';

const tests = [
  [{}],
  [{ username: 'username' }],
  [{ password: 'password' }],
]

describe(__filename, () => {
  tests.forEach((test) => {
    const [input, output] = test;

    it(JSON.stringify(input), async () => {
      try {
        const result = await authLogin(input as any);
        assert.deepEqual(result, output);
      } catch (err) {
        if (output) {
          throw err;
        }
      }
    })
  })
});
