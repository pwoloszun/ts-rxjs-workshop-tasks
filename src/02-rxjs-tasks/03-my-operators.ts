import { Observable, NEVER, withLatestFrom, EMPTY } from 'rxjs';

import { myFromArray$, myInterval$, myRange$ } from './01-my-observables';
import { fullObserver } from './utils';

export function myTake$<T>(source$: Observable<T>, count: number): Observable<T> {

  return new Observable((obs) => {
    let i = 0;

    const srcSubscription = source$.subscribe({
      next(value) {
        if (i < count) {
          obs.next(value);
        }
        i += 1;
        if (i >= count) {
          obs.complete()
        }
      },
      error(err) {
        obs.error(err);
      },
      complete() {
        obs.complete();
      },
    });

    return () => {
      srcSubscription.unsubscribe();
    };
  });

}

function taskTake() {
  const interval$ = myInterval$(500);
  const firstFour$ = myTake$(interval$, 4);
  firstFour$.subscribe(fullObserver('taskTake'));


  const arr$ = myFromArray$(['a', 'b']);
  const arrFirstFour$ = myTake$(arr$, 4);

  arrFirstFour$.subscribe(fullObserver('arr TAKE'));

}

// TODO task: mySkip$
function mySkip$(source$: Observable<any>, count: number): Observable<any> {
  return new Observable((obs) => {

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

  const arr$ = myFromArray$(['a', 'b', 'c', 'd']);
  const arrSkip$ = mySkip$(arr$, 3);
  arrSkip$.subscribe(fullObserver('ARR skip'));
}

// TODO task: myMap$
function myMap$<T, K>(source$: Observable<T>, mappingFn: (item: T) => K): Observable<K> {

  return new Observable((obs) => {
    const srcSub = source$.subscribe({
      next(value) {
        const mappedValue = mappingFn(value);
        obs.next(mappedValue);
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

function taskMap() {
  const interval$ = myInterval$(500);
  const mapped$ = myMap$(interval$, (i) => i * 10);
  mapped$.subscribe(fullObserver('taskMap'));

  const names$ = myFromArray$(['bob', 'ed']);
  const greetings$ = myMap$(names$, (name) => `Hello ${name}!`);
  greetings$.subscribe(fullObserver('greetings'));
}

// TODO task: myFilter$
function myFilter$<T>(source$: Observable<T>, filteringFn: (item: T) => boolean): Observable<T> {

  return new Observable((obs) => {
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
  return new Observable((obs) => {
    let memo = startValue;

    const srcSub = source$.subscribe({
      next(value) {
        memo = accumulatorFn(memo, value);
      },
      error(err) {
        obs.error(err);
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
  // -600
  // complete
}

// TODO myBufferCount$
function myBufferCount$(source$: Observable<any>, bufferSize: number) {

  return new Observable((obs) => {
    let buffer: any[] = [];

    const srcSub = source$.subscribe({
      next(value) {
        buffer.push(value);
        if (buffer.length >= bufferSize) {
          obs.next(buffer);
          buffer = [];
        }
      },
      error(err) {
        obs.error(err);
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
  // [50, 66]
  // complete
}

function myStartsWith$(source$: Observable<any>, startValue: any) {
  return NEVER;
}

function taskStartsWith() {
  const values$ = myRange$(0, 10);
  myStartsWith$(values$, 'GGG')
    .subscribe(fullObserver('taskStartsWith'));
}

function myWithLatestFrom$<T, K>(source$: Observable<T>, other$: Observable<K>): Observable<[T, K]> {

  return new Observable((obs) => {
    let otherValue: K;
    let hasOtherEmitted = false;

    const srcSub = source$.subscribe({
      next(value) {
        if (hasOtherEmitted) {
          obs.next([value, otherValue]);
        }
      },
      complete() {
        obs.complete();
      },
    });

    const otherSub = other$.subscribe({
      next(value) {
        hasOtherEmitted = true;
        otherValue = value
      },
    });

    return () => {
      srcSub.unsubscribe();
      otherSub.unsubscribe();
    }
  });

}

function taskWithLatestFrom() {
  const slow$ = myInterval$(3000);
  const quick$ = myInterval$(800);

  myWithLatestFrom$(slow$, quick$)
    .subscribe(fullObserver('Leader: slow [1st exmpl]'));
  // [0, 2]
  // [1, 6]
  // [2, 10]
  // [3, 14]
  // ,,,

  // myWithLatestFrom$(quick$, slow$)
  //   .subscribe(fullObserver('Leader: quick [2nd exmpl]'));
  // [3, 0]
  // [4, 0]
  // [5, 0]
  // [6, 0]
  // [7, 1]
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
  // taskBufferCount();
  // taskStartsWith();
  taskWithLatestFrom();
}


`======== 16:22 ==========`




















