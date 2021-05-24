import { Subject, Observable, interval, BehaviorSubject, ReplaySubject } from "rxjs";
import { ajax } from "rxjs/ajax";

import { fullObserver } from "./utils";

function subjectIsBothStreamAndObserver() {
  const mySubject = new Subject();

  mySubject.subscribe(fullObserver('1st Observer'));
  mySubject.subscribe(fullObserver('2nd Observer'));

  mySubject.next(123);
  mySubject.next('hello everybody!');
  mySubject.complete();
}

// stores latest emitted value
function getLatestValueSubject() {
  const mySubject = new BehaviorSubject({ data: 'some initial value' });
  // 1st subscriber
  mySubject.subscribe(fullObserver('1st Behavior Observer'));

  mySubject.next({ data: '1st emited data' });   // emit value

  setTimeout(function () {
    // 2nd subscriber
    mySubject.subscribe(fullObserver('2nd Behavior Observer'));
  }, 1200);

  mySubject.next({ data: '2nd emitted data' });   // emit value

  setTimeout(function () {
    mySubject.next({ data: '3rd emitted data' });   // emit value
  }, 2400);
}

// store and re-emit("replay") N latest emitted values
function getNLatesValuesSubject() {
  // const everySecond$ = interval(1000);

  const mySubject = new ReplaySubject(3);
  // 1st subscriber

  mySubject.next(1);
  mySubject.next(2);
  mySubject.next(3);
  mySubject.next(4);
  mySubject.next(5);

  mySubject.subscribe(fullObserver('1st Replay Observer'));

  console.log('next value');
  mySubject.next(6);

  setTimeout(function () {
    // 2nd subscriber
    mySubject.subscribe(fullObserver('2nd Replay Observer'));
  }, 1200);

  console.log('next value');
  mySubject.next(7);

  setTimeout(function () {
    console.log('next value');
    mySubject.next(8);
  }, 2400);
}

export function subjectExamplesApp() {
  // subjectIsBothStreamAndObserver();
  // getLatestValueSubject();
  // getNLatesValuesSubject();
}
