import { workflowGuestbook } from '@src/services';
import { assert } from 'chai';
import 'mocha';

const tests = [
  [{}],
  [{ userId: 1, marriageId: 1, isOnline: true }],
]

describe(__filename, () => {
  tests.forEach((test) => {
    const [input, output] = test;

    it(JSON.stringify(input), async () => {
      try {
        const result = await workflowGuestbook(input as any);
        assert.deepEqual(result, output);
      } catch (err) {
        if (output) {
          throw err;
        }
      }
    })
  })
});
