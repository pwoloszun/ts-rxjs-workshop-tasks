import { Observable, Observer, NEVER } from 'rxjs';

// factory function
export function myCustom$(name: string): Observable<string> {

  return new Observable((obs) => {

    obs.next('tvp 1');
    obs.next('tvp 2');
    obs.next('tvp 3');

    obs.complete();

  });

}

function example1() {
  const custom$ = myCustom$('bob'); // nothing happens

  custom$.subscribe({
    next(value) {
      console.log('[NEXT] example1:', value);
    },
    error(err) {
      console.log('[ERROR] example1:', err);
    },
    complete() {
      console.log('[COMPLETE] example1:');
    }
  });


  custom$.subscribe({
    next(value) {
      console.log('[NEXT22] example1:', value);
    },
    error(err) {
      console.log('[ERROR22] example1:', err);
    },
    complete() {
      console.log('[COMPLETE22] example1:');
    }
  });
  // TODO 1b: next(), error(), complete()
  // TODO 2: each subscribe call generating fn
  // custom$.subscribe(fullObserver('example1'));
}


//======
// setTimeout(() => {
//   // ..,
// }, 2000);

// TODO myTimeout$()
export function myTimeout$(delayInMs: number): Observable<void> {

  return new Observable((obs) => {
    setTimeout(() => {
      obs.next(undefined);
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

// setInterval(() => {
//   // ...
// }, 1000);

// TODO task: myInterval$
export function myInterval$_HOT(delayInMs: number): Observable<number> {

  // HOT stream
  // SHARED producer
  let i = 0; // data PRODUCER

  return new Observable((obs) => {
    setInterval(() => {
      obs.next(i);
      i += 1;
    }, delayInMs);
  });

}

export function myInterval$(delayInMs: number): Observable<number> {

  return new Observable((obs) => {
    // COLD stream
    // NOT SHARED producer
    let i = 0; // data PRODUCER
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

  interval$.subscribe({
    next(value) {
      console.log('NEXT 22 intrvl', value);
    },
    error(err) {
      console.log('ERROR 22 intrvl', err);
    },
    complete() {
      console.log('COMPLETE 22 intrvl');
    },
  });
}

// TODO task: myFullObserver(tag)
function myFullObserver(tag: string): Observer<any> {
  return null as any as Observer<any>;
}

// TODO task: myFromArray$
export function myFromArray$(items: any[]): Observable<any> {

  return new Observable((obs) => {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      obs.next(element);
    }
    obs.complete();
  });

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
  // intervalTask();
  fromArrayTask();
  // fromArrayWithDelayTask();
  // throwTask();
  // rangeTask();
}
