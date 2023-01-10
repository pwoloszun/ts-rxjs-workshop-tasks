import { Observable, NEVER } from 'rxjs';

import { myFromArray$, myInterval$, myRange$ } from './01-my-observables';
import { fullObserver } from './utils';

export function myTake$(source$: Observable<any>, count: number) {

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
      // error(err) {
      //   obs.error(err);
      // },
      complete() {
        obs.complete();
      }
    });

    // cleanup
    return () => srcSub.unsubscribe();
  });

}

function taskTake() {
  const interval$ = myInterval$(500);
  const firstFour$ = myTake$(interval$, 4);
  firstFour$.subscribe(fullObserver('taskTake'));

  const arr$ = myFromArray$(['a', 'b']);
  const firstFourLetters$ = myTake$(arr$, 4);
  firstFourLetters$.subscribe(fullObserver('LETTERS taskTake'));
}

// TODO task: mySkip$
function mySkip$(source$: Observable<any>, count: number): Observable<any> {

  return new Observable(function (obs) {
    let i = 0;

    const srcSub = source$.subscribe({
      next(value) {
        i += 1;
        if (i > count) {
          obs.next(value);
        }
      },
      complete() {
        obs.complete();
      }
    });

    // cleanup
    return () => srcSub.unsubscribe();
  });

}

function taskSkip() {
  const interval$ = myInterval$(500);
  const withoutFirstSeven$ = mySkip$(interval$, 7);
  withoutFirstSeven$.subscribe(fullObserver('taskSkip'));
}

// TODO task: myMap$
function myMap$(source$: Observable<any>, mappingFn: Function): Observable<any> {

  return new Observable(function (obs) {
    const srcSub = source$.subscribe({
      next(value) {
        const mappedValue = mappingFn(value);
        return mappedValue;
      },
      complete() {
        obs.complete();
      }
    });

    // cleanup
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
function myFilter$(source$: Observable<any>, filteringFn: Function): Observable<any> {

  return new Observable(function (obs) {
    const srcSub = source$.subscribe({
      next(value) {
        if (filteringFn(value)) {
          obs.next(value);
        }
      },
      complete() {
        obs.complete();
      }
    });

    // cleanup
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

  return new Observable(function (obs) {
    const srcSub = source$.subscribe({
      next(value) {
        if (predicate(value)) {
          obs.next(value);
        } else {
          obs.complete();
        }
      },
      complete() {
        obs.complete();
      }
    });

    // cleanup
    return () => srcSub.unsubscribe();
  });

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

  return new Observable(function (obs) {
    let memo = startValue;
    const srcSub = source$.subscribe({
      next(value) {
        memo = accumulatorFn(memo, value);
      },
      complete() {
        obs.next(memo);
        obs.complete();
      }
    });

    // cleanup
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
  // -600
  // COMPLETE
  mltpResult$.subscribe(fullObserver('taskReduce'));
}

// TODO myBufferCount$
function myBufferCount$(source$: Observable<any>, bufferSize: number) {
  return NEVER;
}

function taskBufferCount() {
  const values$ = myRange$(0, 67);
  myBufferCount$(values$, 25)
    .subscribe(fullObserver('taskBufferCount'));
  // [0..24]
  // [25..49]
  // [50..66]
  // COMPL
}

function myStartsWith$(source$: Observable<any>, startValue: any) {
  return NEVER;
}

function taskStartsWith() {
  const values$ = myRange$(0, 10);
  myStartsWith$(values$, -100)
    .subscribe(fullObserver('taskStartsWith'));
}

// MASTER - SLAVE
// Leader - Follower
function myWithLatestFrom$(source$: Observable<any>, other$: Observable<any>): Observable<any> {
  return NEVER;
}

function taskWithLatestFrom() {
  const slow$ = myInterval$(4200);
  const quick$ = myInterval$(800);

  myWithLatestFrom$(quick$, slow$)
    .subscribe(fullObserver('taskWithLatestFrom: quick, slow'));
  // -- [0, _]
  // -- [1, _]
  // -- [2, _]
  // -- [3, _]
  // -- [4, _]
  // -- [4, 0]
  // [5, 0] # 4800
  // [6, 0] # 5600
  // [7, 0]
  // ...

  // myWithLatestFrom$(slow$, quick$)
  //   .subscribe(fullObserver('taskWithLatestFrom: slow, quick 2'));
  // -- [_, 0]
  // -- [_, 1]
  // -- [_, 2]
  // -- [_, 3]
  // -- [_, 4]
  // [0, 4] # 4200
  // -- [0, 5]
  // -- [0, 6]
  // -- [0, 7]
  // -- [0, 8]
  // -- [0, 9]
  // [1, 9] # 8400
  // ...

}

export function myOperatorsApp() {
  // taskTake();
  taskSkip();
  // taskMap();
  // taskFilter();
  // taskTakeWhile();
  // taskFirst();
  // taskReduce();
  // taskBufferCount();
  // taskStartsWith();
  // taskWithLatestFrom();
}
