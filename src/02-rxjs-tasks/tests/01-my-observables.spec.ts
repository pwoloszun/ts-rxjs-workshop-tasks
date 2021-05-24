import { TestScheduler } from 'rxjs/testing';

import { createScheduler } from "./helpers/create-scheduler";
import { myCustom$, myTimeout$ } from "../01-my-observables";

describe('my-observables', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = createScheduler();
  });

  it('should test myCustom$', () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const name = 'batman';
      const custom$ = myCustom$(name);
      const expected = '(abc|)';
      const expectedValues = {
        a: `${name} 1`,
        b: `${name} 2`,
        c: `${name} 3`,
      }

      expectObservable(custom$).toBe(expected, expectedValues);
    });
  });

  xit('should test myCustom$ async', () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const name = 'batman';
      const delay = 90;
      const custom$ = myCustom$(name, delay);
      const expected = `${delay - 1}ms a ${delay - 1}ms b ${delay - 1}ms (c|)`;
      const expectedValues = {
        a: `${name} 1`,
        b: `${name} 2`,
        c: `${name} 3`,
      };

      expectObservable(custom$).toBe(expected, expectedValues);
    });
  });

  xit('should test myTimeout$', () => {
    testScheduler.run((helpers) => {
      const { expectObservable, flush } = helpers;
      const delay = 40;
      const custom$ = myTimeout$(delay);
      const expected = `${delay - 1}ms (a|)`;
      const expectedValues = {
        a: undefined,
      };

      flush();

      expectObservable(custom$).toBe(expected, expectedValues);
    });
  });

});
