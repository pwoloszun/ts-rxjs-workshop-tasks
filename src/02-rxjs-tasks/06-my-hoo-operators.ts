import { Observable, Subscription, of, from, interval } from "rxjs";
import { map, mergeAll, take, } from "rxjs/operators";

import { fullObserver } from "./utils";

function letterStream$(letter: string, { delayInMs, count }: { delayInMs: number; count: number; }) {
  return interval(delayInMs).pipe(
    take(count),
    map((i) => `${letter}-${i}`)
  );
}

// TODO: myMergeAll$
export function myMergeAll$<T>(sourceHoo$: Observable<Observable<T>>): Observable<T> {

  return new Observable(function (obs) {
    let isHooCompleted = false;
    let innerRunningCount = 0;

    sourceHoo$.subscribe({
      next(inner$) {
        innerRunningCount += 1;
        inner$.subscribe({
          next(value) {
            obs.next(value);
          },
          error(err) {
            obs.error(err);
          },
          complete() {
            innerRunningCount -= 1;
            if (innerRunningCount <= 0 && isHooCompleted) {
              obs.complete();
            }
          },
        });
      },
      error(err) {
        obs.error(err);
      },
      complete() {
        isHooCompleted = true;
        if (innerRunningCount <= 0) {
          obs.complete();
        }
      },
    });

  });

}

function exampleMyMergeAll() {
  const a$ = letterStream$('A', { delayInMs: 600, count: 5 });
  const b$ = letterStream$('B', { delayInMs: 1500, count: 3 });
  const higherOrderStream$ = from([a$, b$]);

  myMergeAll$(higherOrderStream$)
    .subscribe(fullObserver('exampleMyMergeAll'));
  // A-0 A-1 B-0 A-2 A-3 A-4 B-1 B-2 [COMPLETE]
}

// TODO: myConcatAll$
function myConcatAll$($sourceHoo: Observable<Observable<any>>) {
  return new Observable(function () {
  });
}

function exampleMyConcatAll() {
  const a$ = letterStream$('A', { delayInMs: 600, count: 5 });
  const b$ = letterStream$('B', { delayInMs: 1500, count: 3 });
  const higherOrderStream$ = from([a$, b$]);

  myConcatAll$(higherOrderStream$)
    .subscribe(fullObserver('exampleMyConcatAll'));
}

// TODO: mySwitchAll$
function mySwitchAll$($sourceHoo: Observable<Observable<any>>) {
  return new Observable(function () {
  });
}

function exampleMySwitchAll() {
  const a$ = letterStream$('A', { delayInMs: 600, count: 5 });
  const b$ = letterStream$('B', { delayInMs: 1500, count: 3 });
  const c$ = letterStream$('C', { delayInMs: 1500, count: 2 });
  const arr$ = [a$, b$, c$];
  const higherOrderStream$ = interval(2000).pipe(
    take(arr$.length),
    map((i) => arr$[i])
  );

  mySwitchAll$(higherOrderStream$)
    .subscribe(fullObserver('mySwitchAll$'));
}


// TODO: myExhaustAll$
function myExhaustAll$(sourceHoo$: Observable<Observable<any>>) {

  return new Observable(function (obs) {
    let isInnerRunning = false;

    sourceHoo$.subscribe({
      next(inner$) {
        if (!isInnerRunning) {
          isInnerRunning = true;
          inner$.subscribe({
            next(value) {
              obs.next(value);
            },
            error(err) { },
            complete() {
              isInnerRunning = false;
            },
          });
        }
      },
      error(err) { },
      complete() { },
    });

  });

}

function exampleMyExhaustAll() {
  const a$ = letterStream$('A', { delayInMs: 600, count: 5 });
  const b$ = letterStream$('B', { delayInMs: 1500, count: 3 });
  const c$ = letterStream$('C', { delayInMs: 1500, count: 2 });
  const arr$ = [a$, b$, c$];
  const higherOrderStream$ = interval(2000).pipe(
    take(arr$.length),
    map((i) => arr$[i])
  );

  myExhaustAll$(higherOrderStream$)
    .subscribe(fullObserver('exampleMyExhaustAll'));
  // A-0 A-1 A-2 A-3 A-4 C-0 C-1 [COMPLETE]
}


export function myHooOperatorsApp() {
  // exampleMyMergeAll();
  // exampleMyConcatAll();
  // exampleMySwitchAll();
  exampleMyExhaustAll();
}
