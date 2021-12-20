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

  return new Observable((obs) => {
    let isHooCompleted = false;
    let innerOpenedCount = 0;

    sourceHoo$.subscribe({
      next(inner$) {
        innerOpenedCount += 1;
        inner$.subscribe({
          next(value) {
            obs.next(value);
          },
          error(err) {
            obs.error(err);
          },
          complete() {
            innerOpenedCount -= 1;
            if (isHooCompleted && innerOpenedCount <= 0) {
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
        if (innerOpenedCount <= 0) {
          obs.complete();
        }
      },
    });

  });

}

function exampleMyMergeAll() {
  const webSeckA$ = letterStream$('A', { delayInMs: 600, count: 5 });
  const webSockB$ = letterStream$('B', { delayInMs: 1500, count: 3 });
  const sockets = [webSeckA$, webSockB$];
  const openSockets$ = from(sockets);
  // => A-0 A-1 B-0 A-2 A-3 A-4 B-1 B-2

  // const openSockets$ = interval(500).pipe(
  //   take(sockets.length),
  //   map((i) => sockets[i])
  // );
  // =>// A-0 A-1 A-2 B-0 A-3 A-4 B-1 B2

  // const webSeckA$ = letterStream$('A', { delayInMs: 100, count: 2 });
  // const webSockB$ = letterStream$('B', { delayInMs: 80, count: 3 });
  // const sockets = [webSeckA$, webSockB$];
  // const openSockets$ = interval(1000).pipe(
  //   take(sockets.length),
  //   map((i) => sockets[i])
  // );

  myMergeAll$(openSockets$)
    .subscribe(fullObserver('exampleMyMergeAll'));

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
  // => A-0 A-1 A-2 B-0 C-0 C-1
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
