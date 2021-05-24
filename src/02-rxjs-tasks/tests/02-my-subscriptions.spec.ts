import { TestScheduler } from 'rxjs/testing';
import { map, throttleTime } from "rxjs/operators";

import { createScheduler } from "./helpers/create-scheduler";

describe('my-subscriptions', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = createScheduler();
  });

  it('should test map', () => {
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

});
