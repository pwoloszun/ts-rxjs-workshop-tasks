import {
  interval,
  MonoTypeOperatorFunction,
  Observable,
  from,
  OperatorFunction,
  of,
  fromEvent
} from 'rxjs';
import {
  first,
  map,
  filter,
  takeWhile,
  take,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  delay,
  bufferTime,
  tap,
  scan
} from 'rxjs/operators';

import { fullObserver } from './utils/index';

// Rx custom Operator TEMPLATE
function myCustomOperator() {
  return function (source$: Observable<any>) {
    return source$.pipe(/*...*/);
  };
}

function reverseString(): MonoTypeOperatorFunction<string> {
  return null as any;
}

function reverseStringExample() {
  from([
    'abc',
    'def',
    'xyz'
  ]).pipe(
    reverseString()
  ).subscribe(fullObserver('reverseStringExample'));
}


function firstTruthy<T>(): MonoTypeOperatorFunction<T> {
  return null as any;
}

function firstTruthyExample() {
  from([0, '', null, false, 'imba!', 997]).pipe(
    firstTruthy()
  ).subscribe(fullObserver('firstTruthyExample'));
}

function takeTruthy<T>(count: number = 1): MonoTypeOperatorFunction<T> {
  return null as any;
}

function takeTruthyExample() {
  const values = [0, true, '', null, false, 'imba!', 997, null, 123, null];
  interval(800).pipe(
    take(values.length),
    map((i) => values[i]),
    takeTruthy(3)
  ).subscribe(fullObserver('firstTruthyExample'));
}

function pow<T>(n: number): MonoTypeOperatorFunction<number> {
  return null as any;
}

function powExample() {
  from([0, 1, 2, 3, 4, 5]).pipe(
    pow(3)
  ).subscribe(fullObserver('powExample'));
}

// ======
type DataProducerFn<T> = (query: string) => Observable<T>;

function liveSearch<R>(time: number, producer: DataProducerFn<R>): OperatorFunction<string, R> {
  return null as any;
}

const getQueryFieldEl = () => document.querySelector('.search-form .query-field')!;
const getFirsNameEl = () => document.querySelector('.firstName')!;

function liveSearchExample() {
  const queryFieldEl = getQueryFieldEl();
  fromEvent(queryFieldEl, 'keyup').pipe(
    map((event) => (event.target as HTMLInputElement).value),
    liveSearch(300, searchApi)
  ).subscribe(fullObserver('liveSearchExample'));
}

const searchApi: DataProducerFn<string[]> = (query: string): Observable<string[]> => {
  return of([
    `${query} 1st res`,
    `${query} 2nd res`,
    `${query} third res`,
    `${query} fourth res`,
  ]).pipe(
    delay(800)
  );
};

// ======
function getKey(ev: KeyboardEvent): string {
  return String.fromCharCode(ev.keyCode);
}

interface InputStats {
  [key: string]: number;
}

function gatherInputStats(time: number): OperatorFunction<Event, InputStats> {
  return null as any;
}

function gatherInputStatsExample() {
  const queryFieldEl = getQueryFieldEl();
  fromEvent(queryFieldEl, 'keypress').pipe(
    gatherInputStats(2000)
  ).subscribe(fullObserver('gatherInputStatsExample'));
}

export function customRxOperators() {
  // reverseStringExample();
  // firstTruthyExample();
  // takeTruthyExample();
  // powExample();
  // liveSearchExample();
  // gatherInputStatsExample();
}
