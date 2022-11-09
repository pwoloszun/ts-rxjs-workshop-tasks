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
    let innerActiveCount = 0;
    let isHooComplete = false;
    const subsCont = new Subscription();

    const hooSub = sourceHoo$.subscribe({
      next(inner$) {
        innerActiveCount += 1;
        const innerSub = inner$.subscribe({
          next(value) {
            obs.next(value);
          },
          complete() {
            innerActiveCount -= 1;
            if (isHooComplete && innerActiveCount <= 0) {
              obs.complete();
            }
          },
        });
        subsCont.add(innerSub);
      },
      complete() {
        isHooComplete = true;
        if (innerActiveCount <= 0) {
          obs.complete();
        }
      },
    });
    subsCont.add(hooSub);

    return () => subsCont.unsubscribe();
  });

}

function exampleMyMergeAll() {
  const a$ = letterStream$('A', { delayInMs: 600, count: 5 });
  const b$ = letterStream$('B', { delayInMs: 1500, count: 3 });
  const higherOrderStream$ = from([a$, b$]);

  myMergeAll$(higherOrderStream$)
    .subscribe(fullObserver('exampleMyMergeAll'));
  // A-0 A-1 B-0 A2 A3 A4 B1 B2 COMPLETE
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
  // A0 A1 A2 B0 C0 C1 COMPLETE
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
  // A0..A4 C0..C1 COMPLETE
}


export function myHooOperatorsApp() {
  exampleMyMergeAll();
  // exampleMyConcatAll();
  // exampleMySwitchAll();
  // exampleMyExhaustAll();
}
