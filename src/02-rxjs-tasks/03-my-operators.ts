import { Observable, NEVER } from 'rxjs';

import { myFromArray$, myInterval$, myRange$ } from './01-my-observables';
import { fullObserver } from './utils';

export function myTake$<T>(source$: Observable<T>, count: number) {

  return new Observable(function (obs) {
    let i = 0;
    const srcSub = source$.subscribe({
      next(value) {
        if (i < count) {
          obs.next(value);
          i += 1;
        }
        if (i >= count) {
          obs.complete();
        }
      },
      error(err) {
        obs.error(err);
      },
      complete() {
        obs.complete();
      },
    });

    return () => srcSub.unsubscribe();
  });

}

function taskTake() {
  const interval$ = myInterval$(500);
  const firstFour$ = myTake$(interval$, 4);
  firstFour$.subscribe(fullObserver('taskTake'));

  // const letters$ = myFromArray$(['a', 'b']);
  // const firstFourLetter$ = myTake$(letters$, 4);
  // firstFourLetter$.subscribe(fullObserver('taskTake'));
}







// TODO task: mySkip$
function mySkip$(source$: Observable<any>, count: number): Observable<any> {
  return new Observable(function (obs) {
    let i = 0;
    const srcSub = source$.subscribe({
      next(value) {
        if (i >= count) {
          obs.next(value);
        } else {
          i += 1;
        }
      },
      // error(err) {
      //   obs.error(err);
      // },
      complete() {
        obs.complete();
      },
    });

    return () => srcSub.unsubscribe();
  });
}





















function taskSkip() {
  const interval$ = myInterval$(500);
  const withoutFirstSeven$ = mySkip$(interval$, 7);
  withoutFirstSeven$.subscribe(fullObserver('taskSkip'));
}

// TODO task: myMap$
function myMap$<T, K>(source$: Observable<T>, mappingFn: (item: T) => K): Observable<K> {

  return new Observable(function (obs) {
    const srcSub = source$.subscribe({
      next(value) {
        const mapped = mappingFn(value);
        obs.next(mapped);
      },
      complete() {
        obs.complete();
      },
    });

    return () => srcSub.unsubscribe();
  });

}

function taskMap() {
  const interval$ = myInterval$(500);
  const mapped$ = myMap$(interval$, (i: any) => i * 10);
  mapped$.subscribe(fullObserver('taskMap'));

  const names$ = myFromArray$(['bob', 'ed']);
  const greetings$ = myMap$(names$, (name: any) => `Hello ${name}!`);
  greetings$.subscribe(fullObserver('greetings'));
}

// TODO task: myFilter$
function myFilter$<T>(source$: Observable<T>, filteringFn: (item: T) => boolean): Observable<T> {

  return new Observable(function (obs) {
    const srcSub = source$.subscribe({
      next(value) {
        if (filteringFn(value)) {
          obs.next(value);
        }
      },
      complete() {
        obs.complete();
      },
    });

    return () => srcSub.unsubscribe();
  });

}

function taskFilter() {
  const interval$ = myInterval$(500);
  const evens$ = myFilter$(interval$, (i: any) => i % 2 === 0);
  evens$.subscribe(fullObserver('taskFilter'));

  const names$ = myFromArray$(['bob', 'ed', 'kate', 'ben']);
  myFilter$(names$, (name: any) => name[0] === 'b')
    .subscribe(fullObserver('filter names'));
}

// TODO task: myTakeWhile$
function myTakeWhile$<T>(source$: Observable<T>, predicate: (item: T) => boolean): Observable<T> {
  return NEVER;
}

function taskTakeWhile() {
  const interval$ = myInterval$(500);
  const evens$ = myTakeWhile$(interval$, (i: any) => i < 10);
  evens$.subscribe(fullObserver('taskTakeWhile'));

  const names$ = myFromArray$(['bob', 'ben', 'bartosz', 'ed', 'beth']);
  myTakeWhile$(names$, (name: any) => name[0] === 'b')
    .subscribe(fullObserver('taskTakeWhile names on B'));
}

// TODO task: myFirst$
function myFirst$(source$: Observable<any>, predicate: Function): Observable<any> {
  return NEVER;
}

function taskFirst() {
  const interval$ = myInterval$(500);
  const evens$ = myFirst$(interval$, (i: any) => i > 5);
  evens$.subscribe(fullObserver('taskFirst'));
}

// TODO task: myReduce$
function myReduce$<T, K>(
  source$: Observable<T>,
  accumulatorFn: (memo: K, item: T) => K,
  startValue: K
): Observable<K> {


  return new Observable((obs) => {
    let memo = startValue;

    const srcSub = source$.subscribe({
      next(value) {
        memo = accumulatorFn(memo, value);
      },
      complete() {
        obs.next(memo);
        obs.complete();
      },
    });

    return () => srcSub.unsubscribe();
  });


}

function taskReduce() {
  const numbers$ = myFromArray$([3, 4, 10]);
  const mltpResult$ = myReduce$(
    numbers$,
    (memo: any, item: any) => memo * item,
    -5
  );
  mltpResult$.subscribe(fullObserver('taskReduce'));
  // -600, COMPLETE
}

// TODO myBufferCount$
function myBufferCount$<T>(source$: Observable<T>, bufferSize: number): Observable<T[]> {

  return new Observable((obs) => {
    let buffer: T[] = [];

    const srcSub = source$.subscribe({
      next(value) {
        buffer.push(value);
        if (buffer.length >= bufferSize) {
          obs.next(buffer);
          buffer = [];
        }
      },
      complete() {
        if (buffer.length > 0) {
          obs.next(buffer);
        }
        obs.complete();
      },
    });

    return () => srcSub.unsubscribe();
  });

}

function taskBufferCount() {
  const values$ = myRange$(0, 67);
  myBufferCount$(values$, 25)
    .subscribe(fullObserver('taskBufferCount'));
  // [0..24]
  // [25..49]
  // [50..66]
  // COMPLETE
}

function myStartsWith$(source$: Observable<any>, startValue: any) {
  return NEVER;
}

function taskStartsWith() {
  const values$ = myRange$(0, 10);
  myStartsWith$(values$, -100)
    .subscribe(fullObserver('taskStartsWith'));
}

// master - slave
// leader - follower
function myWithLatestFrom$<T, K>(source$: Observable<T>, other$: Observable<K>): Observable<[T, K]> {
  return NEVER;
}

function taskWithLatestFrom() {
  const quick$ = myInterval$(800);
  const slow$ = myInterval$(2500);

  myWithLatestFrom$(quick$, slow$)
    .subscribe(fullObserver('taskWithLatestFrom: quick, slow'));
  // [3, 0]
  // [4, 0]
  // [5, 0]
  // [6, 1] //4800
  // [7, 1]
  // [8, 1] // 7200
  // [9, 2]
  // ...


  myWithLatestFrom$(slow$, quick$)
    .subscribe(fullObserver('taskWithLatestFrom: slow, quick 2'));
  // [0, 2]
  // [1, 5]
  // [2, 8]
  // ...
}

export function myOperatorsApp() {
  // taskTake();
  // taskSkip();
  // taskMap();
  // taskFilter();
  // taskTakeWhile();
  // taskFirst();
  // taskReduce();
  taskBufferCount();
  // taskStartsWith();
  // taskWithLatestFrom();
}
