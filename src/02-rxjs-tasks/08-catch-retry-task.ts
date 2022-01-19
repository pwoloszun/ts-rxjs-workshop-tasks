import { of, concat, range, throwError, timer, interval, EMPTY, NEVER, Observable } from "rxjs";
import { catchError, delay, finalize, map, retry, take, tap } from "rxjs/operators";

import { fullObserver } from "./utils";

function throwExample() {
  concat(
    of({ data: 'some data' }),
    throwError(new Error('OH NOOOO!!')),
    of({ data: 'other data' }),
  ).pipe(
    tap((v) => console.log('my throw LOG', v))
  ).subscribe(fullObserver('throwExample'));
}

function fakeApiCall$() {
  let callsCount = 0;
  return timer(1200).pipe(
    tap(() => console.log('Getting API...', callsCount)),
    map((v) => {
      callsCount++;
      if (callsCount > 5) {
        return v;
      } else {
        throw new Error('Some API error');
      }
    })
  );
}

function catchExample() {
  const apiReq$ = fakeApiCall$();
  apiReq$.pipe(
    retry(2),
    catchError((err) => {
      // handle err
      // ...
      console.log('handle errr:', err);
      return NEVER;
    }),

    tap((v) => console.log('my catch LOG', v))
  ).subscribe(fullObserver('catchExample'));
}


function finalizeExample() {
  interval(1200).pipe(
    take(3),
    finalize(() => console.log('FINALIZE call')),
  ).subscribe(fullObserver('finalizeExample'));
}


export function catchRetryTaskApp() {
  // throwExample();
  catchExample();
  // finalizeExample();
}


const MY_NEVER = new Observable((obs) => {

});

const MY_EMPTY = new Observable((obs) => {
  obs.complete();
});
