import { TestScheduler } from 'rxjs/testing';

import { createScheduler } from "./helpers/create-scheduler";
import { myConcatAll$, myMergeAll$ } from "../06-my-hoo-operators";

describe('my-hoo-operators', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = createScheduler();
  });

  describe('myMergeAll$', () => {
    it('should emit when any source$ emit', () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;
        const httpReq1$ = cold('d-----(e|)', { d: 'REQ-1', e: 'SUCCESS-1' });
        const httpReq2$ = cold('    f-----(g|)', { f: 'REQ-2', g: 'SUCCESS-2' });
        const httpReq3$ = cold('        h-----(i|)', { h: 'REQ-3', i: 'SUCCESS-3' });
        const click$ = cold('  -a---b---c', { a: httpReq1$, b: httpReq2$, c: httpReq3$ });
        const expected = '     -d---f-e-h-g---i'; // TODO: close result$
        const expectedValues = {
          d: 'REQ-1',
          f: 'REQ-2',
          h: 'REQ-3',
          e: 'SUCCESS-1',
          g: 'SUCCESS-2',
          i: 'SUCCESS-3',
        };

        const actual$ = myMergeAll$(click$);
        expectObservable(actual$).toBe(expected, expectedValues);
      });
    });
  });

  describe('myConcatAll$', () => {
    it('should queue inner streams', () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable, expectSubscriptions } = helpers;
        const a$ = cold('   -x-y|');
        const b$ = cold('       -z-o|');
        const hoo$ = cold('-a-  b-|', { a: a$, b: b$ });
        const expected = ' --x-y-z-o|';

        const actual$ = myConcatAll$(hoo$);
        expectObservable(actual$).toBe(expected);
      });
    });
  });

});
