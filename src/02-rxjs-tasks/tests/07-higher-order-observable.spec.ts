import { exhaust, map, mergeAll, mergeMap, take, throttleTime } from "rxjs/operators";
import { TestScheduler } from 'rxjs/testing';

import { createScheduler } from "./helpers/create-scheduler";

describe('higher-order-observable', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = createScheduler();
  });

  describe('mergeAll', () => {
    it('should emit when any source$ emit', () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;
        const httpReq1$ = cold('r-----(s|)', { r: 'REQ-1', s: 'SUCCESS-1' });
        const httpReq2$ = cold('r-----(s|)', { r: 'REQ-2', s: 'SUCCESS-2' });
        const httpReq3$ = cold('r-----(s|)', { r: 'REQ-3', s: 'SUCCESS-3' });
        const click$ = cold('  -a---b---c', {
          a: httpReq1$,
          b: httpReq2$,
          c: httpReq3$,
        });
        const expected = '-a---b-x-c-y---z';
        const expectedValues = {
          a: 'REQ-1',
          b: 'REQ-2',
          c: 'REQ-3',
          x: 'SUCCESS-1',
          y: 'SUCCESS-2',
          z: 'SUCCESS-3',
        };

        const result$ = click$.pipe(
          mergeAll()
        );
        expectObservable(result$).toBe(expected, expectedValues);
      });
    });
  });

  describe('exhaust', () => {
    it('should emit when any source$ emit', () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;
        const httpReq1$ = cold('r-----(s|)', { r: 'REQ-1', s: 'SUCCESS-1' });
        const httpReq2$ = cold('r-----(s|)', { r: 'REQ-2', s: 'SUCCESS-2' });
        const httpReq3$ = cold('r-----(s|)', { r: 'REQ-3', s: 'SUCCESS-3' });
        const click$ = cold('  -a---b---c', {
          a: httpReq1$,
          b: httpReq2$,
          c: httpReq3$,
        });
        const expected = '-a-----x-c-----z';
        const expectedValues = {
          a: 'REQ-1',
          c: 'REQ-3',
          x: 'SUCCESS-1',
          z: 'SUCCESS-3',
        };

        const result$ = click$.pipe(
          exhaust()
        );
        expectObservable(result$).toBe(expected, expectedValues);
      });
    });
  });

});
