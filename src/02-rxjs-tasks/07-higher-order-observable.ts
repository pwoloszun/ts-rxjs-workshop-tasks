import { forkJoin, interval, of, from, timer, NEVER, Observable, fromEvent } from 'rxjs';
import {
  concatMap,
  delay,
  exhaustMap,
  map,
  mergeAll,
  mergeMap,
  switchMap,
  switchMapTo,
  take,
  tap,
  zip
} from 'rxjs/operators';

import { fullObserver, items$, randomBetween } from './utils';


function getUserData$(): Observable<any> {
  return NEVER;
}

const buttonDom = {} as any;

const btnClick$ = fromEvent(buttonDom, 'click')

btnClick$.pipe(
  map((event) => {
    const httpReq$ = getUserData$();
    return httpReq$; // inner stream
  })
).subscribe({
  next(http$) {
    http$.subscribe({
      next(value) {
        console.log('data from server:', value);
      }
    })
  }
});
