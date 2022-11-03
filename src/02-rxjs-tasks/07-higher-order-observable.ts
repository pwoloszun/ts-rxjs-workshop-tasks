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


function initBtnClick$(delayMs: number, count: number): Observable<any> {
  return interval(delayMs).pipe(
    take(count)
  );
}

function fetchData$(url: string, respnseTime: number): Observable<string[]> {
  return of(['data 1', 'data 2']).pipe(
    tap(() => console.log('REQ:', url)),
    delay(respnseTime)
  );
}

export function hooExamples() {
  const btnClick$ = initBtnClick$(1000, 3);


  const usersData$ = btnClick$.pipe(
    map(() => {
      const httpReq$ = fetchData$('/users', 2200);
      return httpReq$;
    })
  );

  usersData$.subscribe((inner$) => {
    inner$.subscribe((usersDtos) => {
      console.log('user DTOS:', usersDtos);
    });
  });


}











function example1() {
  const btnClick$ = interval(600); // fake 'Download' btn clicks
  const fetchData$ = of({ id: 1, title: 'War & Peace' }).pipe( // fake data downloaded asynchronously
    delay(1500)
  );
  const downloadOnBtnClickHOO$ = btnClick$.pipe(
    map((i) => fetchData$),
    mergeAll(),
  );

  downloadOnBtnClickHOO$.subscribe(fullObserver('qq'));

  // TODO 2: "flatten" stream of streams
}

function fetchUser$(id: number) {
  return of({ id, name: `user ${id}` }).pipe(
    delay(1200)
  );
}

function example2() {
  const userIds$ = of(123); // user IDs stream
  userIds$.pipe(
    map((userId) => fetchUser$(userId)),
    // TODO: "flatten" Observable
  ).subscribe(fullObserver('example2'));
}

function example3() {
  const first$ = interval(500).pipe(
    take(8),
    map((i) => `FIRST ${i}`)
  );
  const second$ = interval(1200).pipe(
    take(3),
    map((i) => `SECOND ${i * 100}`)
  );

  forkJoin(
    first$,
    second$
  ).subscribe(fullObserver('example3 forkJoin'));
}

function example4() {
  const first$ = interval(500).pipe(
    take(11),
    map((i) => i + 10)
  );
  const second$ = interval(1200).pipe(
    take(5),
    map((i) => i * 10)
  );

  first$.pipe(
    zip(second$, (firstVal, secondVal) => firstVal * secondVal)
  ).subscribe(fullObserver('example4 zip'));
}

// TODO:
// + after delayInMs miliseconds
// + returns Observable with single value: `RESULTS for '${query}'`
// + side effect - logs: `[Searching]\t\t'${query}' results in: ${delayInMs}`
function searchOnServer$(query: string, delayInMs: number) {
  return NEVER;
}

// TODO task 1
function task1() {
  const search$ = searchOnServer$('batman', 1200);
  search$.subscribe(fullObserver('task1'));
}

// TODO:
// user wpisuje w pole search kolejno queries
// kazde kolejne query wpisuje losowa dlugosc czasu miedzy <1.8, 7> sekund
// przed wpisaniem i-tego query, zaloguj: `Q: '${query}', within: ${ms}ms`
function userInputs$(queries: string[]) {
  return NEVER;
}

// TODO task 2
function task2() {
  const queries = [
    'doda', 'batman', 'how to become rich'
  ];
  const inputs$ = userInputs$(queries);
  inputs$.subscribe(fullObserver('task2'));
}

// TODO task 3
// masz dane dwa rodzaje stream'ow: inputs$ oraz searchOnServer$('cos tam', 800)
// stworz stream wynikowy, ktory wywola obydwa streamy ROWNOLEGLE
// wyniki zaloguj na konsoli
function task3() {
  const queries = [
    'doda', 'batman', 'how to become rich', 'rxjs', 'angular', 'react'
  ];
  const inputs$ = items$(queries, 300).pipe(
    tap((q) => console.log(`[usr input]\t\t'${q}'`))
  );

  // TODO
}

// TODO task 4
// masz dane dwa rodzaje stream'ow: inputs$ oraz searchOnServer$('cos tam', 800)
// stworz stream wynikowy, ktory:
// + NAJPIERW poczeka, az zakonczy sie wpisywanie tekstow
// + I DOPIERO potem, dla kazdego wpisanego tekstu wykona wyszukiwanie
// wyniki zaloguj na konsoli
function task4() {
  const queries = [
    'doda', 'batman', 'how to become rich', 'rxjs', 'angular', 'react'
  ];
  const inputs$ = items$(queries, 300).pipe(
    tap((q) => console.log(`[usr input]\t\t'${q}'`))
  );

  // TODO
}

// TODO task 5
// masz dane dwa rodzaje stream'ow: inputs$ oraz searchOnServer$('cos tam', 800)
// stworz stream wynikowy, ktory:
// + za kazdym razem, gdy zakonczy sie wpisywanie tekstow
// + anuluje poprzednie wyszukiwanie na serwerze oraz wystartuje wyszukiwanie na serwerze dla nowo wpisanego tekstu
// wyniki zaloguj na konsoli
function task5() {
  const queries = [
    'doda', 'batman', 'how to become rich', 'rxjs', 'angular', 'react'
  ];
  const inputs$ = items$(queries, 300).pipe(
    tap((q) => console.log(`[usr input]\t\t'${q}'`))
  );

  // TODO
}

// TODO task 6
// masz dane dwa rodzaje stream'ow: inputs$ oraz searchOnServer$('cos tam', 800)
// stworz stream wynikowy, ktory:
// + za kazdym razem, gdy zakonczy sie wpisywanie tekstow
// + sprawdzi czy poprzednie wyszukiwanie na serwerze zakonczone:
//    + jesli tak - wowczas wystartuje wyszukiwanie na serwerze dla nowo wpisanego tekstu
//    + jesli nie - zignoruje wpisany tekst
// wyniki zaloguj na konsoli
function task6() {
  const queries = [
    'doda', 'batman', 'how to become rich', 'rxjs', 'angular', 'react'
  ];
  const inputs$ = items$(queries, 300).pipe(
    tap((q) => console.log(`[usr input]\t\t'${q}'`))
  );

  // TODO
}

export function higherOrderObservablesApp() {
  hooExamples();
  // example1();
  // example2();
  // example3();
  // example4();
  // task1();
  // task2();
  // task3();
  // task4();
  // task5();
  // task6();
}
