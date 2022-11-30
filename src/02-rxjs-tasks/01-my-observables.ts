import { nextTick } from 'process';
import { Observable, Observer, NEVER } from 'rxjs';

export function myCustom$(name: string): Observable<any> {

  return new Observable((obs) => {
    // STREAM GENERATOR FN
    // const person = { name: 'bob' };
    // obs.next(person);
    obs.next('qq 1');
    setTimeout(() => {
      // obs.next('qq 2');
      // obs.next('qq 3');
      // person.name = 'kate';
    }, 2000);
    obs.next('qq 4');

    obs.complete();
  });

}

function example1() {

  const custom$ = myCustom$('bob'); // nothing happens

  // console.log('BEFORE:',);
  custom$.subscribe({
    next(value) {
      // SIDE EFFECT code
      console.log('NEXT [example1]:', value);
    },
    error(err) {
      console.log('ERROR [example1]', err);
    },
    complete() {
      console.log('COMPLETE [example1]');
    },
  });
  // console.log('AFTER:',);

  custom$.subscribe({
    next(value) {
      value.name = 'glupota'
      console.log('NEXT 22 [example1]:', value);
    },
    error(err) {
      console.log('ERROR 22 [example1]', err);
    },
    complete() {
      console.log('COMPLETE 22 [example1]');
    },
  });



  // custom$.subscribe((value: string) => console.log('[NEXT] timeout', value));
  // TODO 1b: next(), error(), complete()
  // TODO 2: each subscribe call generating fn
  // custom$.subscribe(fullObserver('example1'));
}


//======


// TODO myTimeout$()

// setInterval(() => {

// }, 3000)

export function myTimeout$(delayInMs: number): Observable<void> {

  return new Observable((obs) => {

    setTimeout(() => {
      obs.next();
      obs.complete();
    }, delayInMs);

  });

}

function timeoutTask() {
  const timeout$ = myTimeout$(2000); // nothing happens
  timeout$.subscribe({
    next(value) {
      console.log('NEXT timeoutTask', value);
    },
    error(err) {
      console.log('ERROR timeoutTask', err);
    },
    complete() {
      console.log('COMPLETE timeoutTask');
    },

  });
}

// TODO task: myInterval$
export function myInterval$(delayInMs: number): Observable<number> {

  let i = 0;
  return new Observable((obs) => {
    setInterval(() => {
      obs.next(i);
      i += 1;
    }, delayInMs);
  });

}

function intervalTask() {
  const interval$ = myInterval$(500)
  interval$.subscribe({
    next(value) {
      console.log('NEXT intervalTask', value);
    },
    error(err) {
      console.log('ERROR intervalTask', err);
    },
    complete() {
      console.log('COMPLETE intervalTask');
    },
  });
}

// TODO task: myFullObserver(tag)
function myFullObserver(tag: string): Observer<any> {
  return null as any as Observer<any>;
}

// TODO task: myFromArray$
export function myFromArray$(items: any[]): Observable<any> {
  return NEVER; // TODO
}

function fromArrayTask() {
  const names$ = myFromArray$(['bob', 'ed', 'kate'])

  names$.subscribe({
    next(value) {
      console.log('NEXT fromArrayTask', value);
    },
    error(err) {
      console.log('ERROR fromArrayTask', err);
    },
    complete() {
      console.log('COMPLETE fromArrayTask');
    },
  });
}

// TODO task: myRange$
export function myRange$(startValue: number, count: number): Observable<number> {
  return NEVER; // TODO
}

function rangeTask() {
  const range$ = myRange$(5, 7)
  range$.subscribe({
    next(value) {
      console.log('NEXT rangeTask', value);
    },
    error(err) {
      console.log('ERROR rangeTask', err);
    },
    complete() {
      console.log('COMPLETE rangeTask');
    },
  });
}

function myFromArrayWithDelay$(items: any[], delayInMs: number): Observable<any> {
  return NEVER;
}

function fromArrayWithDelayTask() {
  const values = [100, 200, 300];
  myFromArrayWithDelay$(values, 800)
    .subscribe(myFullObserver('fromArrayWithDelayTask'));
}

function myThrow$(error: Error) {
  return NEVER;
}

function throwTask() {
  myThrow$(new Error('Jakis blad!'))
    .subscribe(myFullObserver('throwTask'));
}

// TODO task: myOf$

export function myObservablesApp() {
  // example1();
  // timeoutTask();
  intervalTask();
  // fromArrayTask();
  // fromArrayWithDelayTask();
  // throwTask();
  // rangeTask();
}
