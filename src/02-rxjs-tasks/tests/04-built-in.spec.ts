import { merge } from "rxjs";
import { map, throttleTime } from "rxjs/operators";
import { TestScheduler } from 'rxjs/testing';

import { createScheduler } from "./helpers/create-scheduler";
import { gatherSearchQueries$ } from "../04-built-in";

describe('built-in', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = createScheduler();
  });

  it('should test map() operator', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const s1$ = cold('-a--b---c---|', { a: 1, b: 2, c: 3 });
      const expected = '-d--e---f---|';

      const square$ = s1$.pipe(
        map((value: number) => value ** 2)
      );
      expectObservable(square$).toBe(expected, { d: 1, e: 4, f: 9 });
    });
  });

  it('should test throttle', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const e1 = cold('-a--b--c---|');
      const subs = '   ^----------!';
      const expected = '-a-----c---|';

      const throttled$ = e1.pipe(
        throttleTime(3, testScheduler)
      );
      expectObservable(throttled$).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(subs);
    });
  });

  it('should test merge', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const s1$ = cold('-a---b---c---|');
      const s2$ = cold('d--e--f--|');
      const expected = 'da-e-bf--c---|';

      // const s1$ = cold('-a-b');
      // const s2$ = cold('d--e');
      // const expected = 'da-(be)';

      const result$ = merge(s1$, s2$);
      expectObservable(result$).toBe(expected);
    });
  });

  describe('gatherSearchQueries$', () => {
    let delayInMs, frameTreshhold, actualDelay;

    beforeEach(() => {
      delayInMs = 20;
      frameTreshhold = 9;
      actualDelay = delayInMs + frameTreshhold;
    });

    it('should debounce to frequent changes', () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable, flush } = helpers;
        const inputValues = { a: 'batman', b: 'superman', c: 'spider-man' };
        const input$ = cold('     -a---b---c', inputValues);
        const expected = `${actualDelay}ms c`;
        const expectedValues = inputValues;

        const actual$ = gatherSearchQueries$(input$, delayInMs);

        expectObservable(actual$).toBe(expected, expectedValues);
        flush();
      });
    });

    it('should ignore unchanged queries', () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable, flush } = helpers;
        const inputValues = { a: 'batman', b: 'superman', c: 'spider-man' };
        const input$ = cold(`-  0ms a 21ms a 21ms b 21ms a`, inputValues);
        const expected = `   - 20ms a 41ms -  1ms b 21ms a`;
        const expectedValues = inputValues;

        const actual$ = gatherSearchQueries$(input$, delayInMs);

        expectObservable(actual$).toBe(expected, expectedValues);
        flush();
      });
    });
  });

});
