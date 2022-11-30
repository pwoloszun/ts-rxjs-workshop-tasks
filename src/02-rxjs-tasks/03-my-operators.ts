import { Observable, NEVER } from 'rxjs';

import { myFromArray$, myInterval$, myRange$ } from './01-my-observables';
import { fullObserver } from './utils';

export function myTake$<T>(source$: Observable<T>, count: number): Observable<T> {

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

  // const arr$ = myFromArray$(['a', 'b']);
  // const firstFourLetters$ = myTake$(arr$, 4);
  // firstFourLetters$.subscribe(fullObserver('firstFourLetters'));
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
        const mappedValue = mappingFn(value);
        obs.next(mappedValue);
      },
      error(err) {
        obs.error(err);
      },
      complete() {
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
      error(err) {
        obs.error(err);
      },
      complete() {
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
function myTakeWhile$(source$: Observable<any>, predicate: Function): Observable<any> {
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
function myReduce$(source$: Observable<any>, accumulatorFn: Function, startValue: any): Observable<any> {
  return NEVER;
}

function taskReduce() {
  const numbers$ = myFromArray$([3, 4, 10]);
  const mltpResult$ = myReduce$(
    numbers$,
    (memo: any, item: any) => memo * item,
    -5
  );
  mltpResult$.subscribe(fullObserver('taskReduce'));
  // -600; COMPLETE
}

// TODO myBufferCount$
function myBufferCount$<T>(source$: Observable<T>, bufferSize: number) {

  return new Observable(function (obs) {
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

// MASTER SLAVE
// LEADER FOLLOWER
function myWithLatestFrom$<T, K>(source$: Observable<T>, other$: Observable<K>): Observable<[T, K]> {
  return new Observable((obs) => {
    let hasOtherEmitted = false;
    let lastOtherValue: K;

    other$.subscribe({
      next(value) {
        hasOtherEmitted = true;
        lastOtherValue = value;
      },
    });

    source$.subscribe({
      next(value) {
        if (hasOtherEmitted) {
          obs.next([value, lastOtherValue]);
        }
      },
      complete() {
        obs.complete();
      },
    });

  });
}

function taskWithLatestFrom() {
  const quick$ = myInterval$(800);
  const slow$ = myInterval$(2200);

  myWithLatestFrom$(quick$, slow$)
    .subscribe(fullObserver('taskWithLatestFrom: quick, slow'));
  // ### 800 [0, --] 
  // ### 1600 [1, --]
  // ### 2200 [1, 0]
  // 2400 [2, 0]
  // 3200 [3, 0]
  // 4000 [4, 0]
  // ### 4400 [4, 1]
  // 4800 [5, 1]


  myWithLatestFrom$(slow$, quick$)
    .subscribe(fullObserver('taskWithLatestFrom: slow, quick 2'));
  // ### 800 [--, 0]
  // ### 1600 [--, 1]
  // 2200 [0, 1]
  // ### 2400 [0, 2]
  // ### 3200 [0,  3]
  // ### 4000 [0, 4]
  // 4400 [1, 4]
}

export function myOperatorsApp() {
  // taskTake();
  // taskSkip();
  // taskMap();
  // taskFilter();
  // taskTakeWhile();
  // taskFirst();
  // taskReduce();
  // taskBufferCount();
  // taskStartsWith();
  taskWithLatestFrom();
}
