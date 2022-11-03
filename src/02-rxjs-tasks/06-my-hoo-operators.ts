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

  return new Observable((obs) => {
    const innerSubs: Subscription[] = [];
    let isHooCompl = false;
    let innerCount = 0;

    const hooSub = sourceHoo$.subscribe({
      next(inner$) {
        innerCount += 1;
        const innerSub = inner$.subscribe({
          next(value) {
            obs.next(value);
          },
          error(err) {
            obs.error(err);
          },
          complete() {
            innerCount -= 1;
            if (innerCount <= 0 && isHooCompl) {
              obs.complete();
            }
          },
        });
        innerSubs.push(innerSub);
      },
      error(err) {
        obs.error(err);
      },
      complete() {
        isHooCompl = true;
        if (innerCount <= 0) {
          obs.complete();
        }
      },
    });

    return () => {
      hooSub.unsubscribe();
      innerSubs.forEach((s) => s.unsubscribe());
    };
  });

}

function exampleMyMergeAll() {
  const a$ = letterStream$('A', { delayInMs: 600, count: 5 }); // A-0..A-4
  const b$ = letterStream$('B', { delayInMs: 1500, count: 3 });
  const higherOrderStream$ = from([a$, b$]);

  myMergeAll$(higherOrderStream$)
    .subscribe(fullObserver('exampleMyMergeAll'));
  // A-0 A-1 B-0 A-2 A-3 A-4 B-1 B-2 COMPLETE
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
