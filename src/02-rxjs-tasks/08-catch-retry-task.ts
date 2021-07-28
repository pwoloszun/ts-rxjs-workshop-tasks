import { of, concat, range, throwError, timer, interval, from, NEVER } from "rxjs";
import { catchError, delay, finalize, map, retry, take, tap } from "rxjs/operators";

import { fullObserver } from "./utils";

// of({name: 'bob'}).subscribe()
// from(['a', 'b'])

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

  return timer(2200).pipe(
    tap(() => console.log('Getting API...', callsCount)),
    map((v) => {
      callsCount++;
      if (callsCount > 3) {
        return 456;
      } else {
        throw new Error('Some API error');
      }
    })
  );
}

// try {

// } catch (err) {

// } finally {

// }


function catchExample() {
  const apiCall$ = fakeApiCall$()
  apiCall$.pipe(
    retry(2),
    catchError((error) => {
      console.log('err catched');
      return NEVER;
    }),
    tap((v) => console.log('my catch LOG', v))
  ).subscribe(fullObserver('catchExample'));
}


function finalizeExample() {
  interval(1200).pipe(
    // tap(() => {
    //   throw new Error('argh!');
    // }),
    take(3),
    finalize(() => console.log('FINALIZE call')),
  ).subscribe(fullObserver('finalizeExample'));
}


export function catchRetryTaskApp() {
  // throwExample();
  // catchExample();
  // finalizeExample();


  console.log('BEFORE never');
  NEVER.subscribe(fullObserver('never'));
  console.log('AFTER never');

}
