import { TestScheduler } from 'rxjs/testing';

import { createScheduler } from "./helpers/create-scheduler";
import { myTake$ } from "../03-my-operators";

describe('my-operators', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = createScheduler();
  });

  describe('myTake$', () => {
    let count;

    beforeEach(() => {
      count = 3;
    });

    it('should take at most count values', () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;
        const source$ = cold('-a-b-c-d-e--------');
        const expected = '    -a-b-(c|)';

        const result$ = myTake$(source$, count);

        expectObservable(result$).toBe(expected);
      });
    });

    it('should finish earlier if source finished', () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;
        const source$ = cold('-a-|');
        const expected = '    -a-|';

        const result$ = myTake$(source$, count);

        expectObservable(result$).toBe(expected);
      });
    });

    it('should not finish unless source$ emits count values', () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;
        const source$ = cold('-a----b-----');
        const expected = '    -a----b';

        const result$ = myTake$(source$, count);

        expectObservable(result$).toBe(expected);
      });
    });

    it('should throw source$ error if not finished', () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;
        const source$ = cold('-a----b--#');
        const expected = '    -a----b--#';

        const result$ = myTake$(source$, count);

        expectObservable(result$).toBe(expected);
      });
    });

    it('should not throw source$ error if finished earlier', () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;
        const source$ = cold('-a-b-c-#');
        const expected = '    -a-b-(c|)';

        const result$ = myTake$(source$, count);

        expectObservable(result$).toBe(expected);
      });
    });
  });

  xdescribe('mySkip$', () => { // TODO
  });

  xdescribe('myMap$', () => { // TODO
  });

  xdescribe('myReduce$', () => { // TODO
  });

  xdescribe('myBufferCount$', () => { // TODO
  });

});
