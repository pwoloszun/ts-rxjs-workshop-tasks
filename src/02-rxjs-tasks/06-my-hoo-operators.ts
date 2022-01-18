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
export function myMergeAll$(sourceHoo$: Observable<Observable<any>>) {

  return new Observable(function (obs) {
    let isHooCompleted = false;
    let activeInnerCount = 0;

    sourceHoo$.subscribe({
      next(inner$) {
        activeInnerCount += 1;
        inner$.subscribe({
          next(value) {
            obs.next(value);
          },
          error(err) {
            obs.error(err);
          },
          complete() {
            activeInnerCount -= 1;
            if (isHooCompleted && activeInnerCount <= 0) {
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
        if (activeInnerCount <= 0) {
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
  // A-0 A-1 B-0 A-2 A-3 A-4 B-1 B-2 [COMPL]
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

  // A-0..A-4 B-0..B-2
}

// TODO: mySwitchAll$


function mySwitchAll$(sourceHoo$: Observable<Observable<any>>) {

  return new Observable(function (obs) {
    let innerSubscription: Subscription | null = null;
    let isHooCompleted = false;

    sourceHoo$.subscribe({
      next(inner$) {
        if (innerSubscription) {
          innerSubscription.unsubscribe();
        }
        innerSubscription = inner$.subscribe({
          next(value) {
            obs.next(value);
          },
          error(err) { },
          complete() {
            if (isHooCompleted) {
              obs.complete();
            }
          },
        });
      },
      error(err) { },
      complete() {
        isHooCompleted = true;
        if (innerSubscription?.closed) {
          obs.complete();
        }
      },
    });

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
  // A-0 A-1 A-2 B-0 C-0 C-1 [COMPL]
}


// TODO: myExhaustAll$
function myExhaustAll$($sourceHoo: Observable<Observable<any>>) {
  return new Observable(function () {
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
}


export function myHooOperatorsApp() {
  // exampleMyMergeAll();
  // exampleMyConcatAll();
  exampleMySwitchAll();
  // exampleMyExhaustAll();
}
