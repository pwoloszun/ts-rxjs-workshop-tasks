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
    let isHooComplete = false;
    let activeInnerCount = 0;

    sourceHoo$.subscribe({
      next(inner$) {
        activeInnerCount += 1;
        inner$.subscribe({
          next(value) {
            obs.next(value);
          },
          complete() {
            activeInnerCount -= 1;
            if (activeInnerCount <= 0 && isHooComplete) {
              obs.complete();
            }
          },
        });
      },
      complete() {
        isHooComplete = true;
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
  // const c$ = of('C0');
  const higherOrderStream$ = from([a$, b$]);
  // const arr = [a$, b$,];
  // const higherOrderStream$ = interval(60 * 1000).pipe(
  //   take(arr.length),
  //   map((i) => arr[i])
  // );

  myMergeAll$(higherOrderStream$)
    .subscribe(fullObserver('exampleMyMergeAll'));
  // A0 A1 B0 A2 A3 A4 B1 B2 COMPLETE
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
  exampleMyMergeAll();
  // exampleMyConcatAll();
  // exampleMySwitchAll();
  // exampleMyExhaustAll();
}
