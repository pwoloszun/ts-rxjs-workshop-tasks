import { Observable, NEVER } from 'rxjs';

import { myFromArray$, myInterval$, myRange$ } from './01-my-observables';
import { fullObserver } from './utils';

export function myTake$(source$: Observable<any>, count: number) {

  return new Observable(function (obs) {
    let i = 0;

    const sub = source$.subscribe({
      next(value) {
        if (i < count) {
          obs.next(value);
          i += 1;
          if (i >= count) {
            obs.complete();
          }
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
      sub.unsubscribe();
    };
  });

}

function taskTake() {
  const interval$ = myInterval$(500);
  const firstFour$ = myTake$(interval$, 4);
  firstFour$.subscribe(fullObserver('taskTake'));


  // const arr$ = myFromArray$([1, 2]);
  // const res$ = myTake$(arr$, 4);
  // res$.subscribe(fullObserver('taskTake 2'));
}









// TODO task: mySkip$
function mySkip$(source$: Observable<any>, count: number): Observable<any> {

  return new Observable((obs) => {
    let i = 0;
    source$.subscribe({
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

  });
}

function taskSkip() {
  const interval$ = myInterval$(500);
  const withoutFirstSeven$ = mySkip$(interval$, 7);
  withoutFirstSeven$.subscribe(fullObserver('taskSkip'));
}

// TODO task: myMap$
function myMap$(source$: Observable<any>, mappingFn: Function): Observable<any> {
  return new Observable((obs) => {
    source$.subscribe({
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
function myFilter$(source$: Observable<any>, filteringFn: Function): Observable<any> {
  return new Observable((obs) => {
    source$.subscribe({
      next(value) {
        const isPass = filteringFn(value);
        if (isPass) {
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
    source$.subscribe({
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

  });
}

function taskReduce() {
  const numbers$ = myFromArray$([3, 4, 10]);
  const mltpResult$ = myReduce$(
    numbers$,
    (memo: any, item: any) => memo * item,
    -5
  );
  mltpResult$.subscribe(fullObserver('taskReduce')); // -600
}

// TODO myBufferCount$
function myBufferCount$<T>(source$: Observable<T>, bufferSize: number): Observable<T[]> {
  return new Observable((obs) => {
    let buffer: T[] = [];

    source$.subscribe({
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

  });
}

function taskBufferCount() {
  const values$ = myRange$(0, 67);
  myBufferCount$(values$, 25)
    .subscribe(fullObserver('taskBufferCount'));
  // [0..24]
  // [25, 49]
  // [50, 66]
}

function myStartsWith$(source$: Observable<any>, startValue: any) {
  return NEVER;
}

function taskStartsWith() {
  const values$ = myRange$(0, 10);
  myStartsWith$(values$, -100)
    .subscribe(fullObserver('taskStartsWith'));
}

function myWithLatestFrom$(source$: Observable<any>, other$: Observable<any>): Observable<any> {
  return NEVER;
}

function taskWithLatestFrom() {
  const slow$ = myInterval$(800);
  const quick$ = myInterval$(4200);

  // myWithLatestFrom$(quick$, slow$)
  //   .subscribe(fullObserver('taskWithLatestFrom: quick, slow'));

  myWithLatestFrom$(slow$, quick$)
    .subscribe(fullObserver('taskWithLatestFrom: slow, quick 2'));
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
