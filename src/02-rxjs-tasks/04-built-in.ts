// Observable creators
import { interval, from, range } from 'rxjs';

// operators
import {
  map,
  filter,
  reduce,
  scan,
  take,
  takeLast,
  takeWhile,
  skip,
  delay,
  tap,
  buffer,
  bufferTime,
  bufferCount,
  first,
  skipWhile,
  startWith,
  withLatestFrom,
} from 'rxjs/operators';
import { myInterval$ } from './01-my-observables';

import { fullObserver } from './utils';


// myBufferCount(
//   myFilter$(
//     myMap$(
//       myInterval$(1000),
//       (n) => n ** 2
//     ),
//     (i) => i % 2 === 0
//   ),
//   25
// )

// interval(1000).pipe(
//   map((n) => n ** 2),
//   filter((i) => i % 2 === 0),
//   bufferCount(25)
// );

















// TODO example 1:
// wez tablice imion ->
// bierz imiona dopoki !== 'ADMIN' ->
// przemapuj je na powitania: 'Hello X' ->
// opoznij o 1.2s ->
// wyniki zaloguj na konsoli
function example1() {
  from(['bob', 'ed', 'kate', 'ADMIN', 'boby']).pipe(
    takeWhile((name) => name !== 'ADMIN'),
    map((name) => `Hello ${name}`),
    delay(1200)
  ).subscribe(fullObserver('example1'));

}

// TODO example 3:
// co 1.2s ->
// wez i-te imie ->
// bierz kolejne imie dopoki !== 'Admin'
// przemapuj je na powitania: 'Hello NAME_PLACEHOLDER' ->
// wyniki zaloguj na konsoli
function example3() {
  const names = ['bob', 'ed', 'kate', 'ADMIN', 'boby'];
  // TODO
}


// TODO task 1:
// wygeneruj liczby z przedzialu [5..21] ->
// odfiltruj tylko nieparzyste ->
// pomin pierwsze 3 ->
// z pozostalych wez tylko pierwsze 4 ->
// przemapuj na kwadraty tych liczb ->
// wyniki zaloguj na konsoli
function task1() {

}

// TODO task 2:
// stworz interwal co 0.8s ->
// pomin pierwsza wygenerowana liczbe
// z pozostalych, wez tylko 10 pierwszych wynikow ->
// obliczaj iloczyn wszystkich dotychczas wygenerowanych liczb -> SCAN
// kazdy posredni wynik zaloguj na konsoli ("side effect")-> TAP
// wez tylko ostatni obliczony wynik ->
// ostatni iloczyn zaloguj na konsoli
function task2() {
}

// TODO task 3:
// co 1s generuj kolejna liczbe parzysta ->
// bierz liczby dopoki (i < 20) ->
// oblicz sume wszystkich liczb ->
// wynik zaloguj na konsoli
function task3() {
}

// TODO task 4:
// co 0.1s generuj kolejna liczbe naturalna, poczawszy od 10 ->
// wez pierwsze 110 takich liczb ->
// zbuforuj w "slice'y" po 25 sztuk ->
// bierz slice'y dopoki pierwszy element slice'a < 70
// wez (first) pierwszy taki slice, w ktorym pierwszy element slice'a > 30
// wyniki zaloguj na konsoli
function task4() {
}


// TODO task 5:
// co 0.1s generuj liczbe naturalna ->
// przemapuj ja na kwadrat tej liczby ->
// pomijaj te liczby dopoki: (n / 100) < 100 ->
// bierz te liczby dopoki: n < 20000 ->
// buforuj wyniki i wydawaj je za kazdym razem gdy everyTwoSeconds$ cos emituje
// wyniki zaloguj na konsoli
function task5() {
}

// TODO task 6:
// co 1s generuj liczbe naturalna ->
// wez 5 akich licz ->
// rozpocznij wartosciami -20 i -10 ->
// "polacz" stream z ostatnio wygenerowanymi wartosciami przez hundreds$ ->
// zsumuj ostatnio wygenerowane wartosci przez: stream wejsciowy oraz hundreds ->
// wyniki zaloguj na konsoli
// EXPECTED: 1, 2, 103, 104, COMPLETED
function task6() {
  const hundreds$ = interval(2000).pipe(
    take(3),
    map((i) => i * 100)
  );

  // TODO
}

export function builtInApp() {
  // example1();
  // example2();
  // example3();
  // task1();
  // task2();
  // task3();
  // task4();
  // task5();
  // task6();
}
