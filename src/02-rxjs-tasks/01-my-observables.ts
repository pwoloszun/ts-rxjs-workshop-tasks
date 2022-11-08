import { Observable, Observer, NEVER } from 'rxjs';

// stream factory function
export function myCustom$(name: string): Observable<string> {

  return new Observable((obs) => { // tream generator function
    obs.next('TVP 1');

    setTimeout(() => {
      obs.next('TVP 2');
      obs.next('TVP 3');
      obs.complete();
    }, 2000);

    obs.next('TVP 4');
  });

}

function example1() {
  console.log('example1 RUN:',);

  const custom$ = myCustom$('bob'); // nothing happens

  // custom$.subscribe((value: string) => console.log('[NEXT] timeout', value));

  custom$.subscribe({
    next(value) {
      // side effect 
      console.log('[NEXT] example1:', value);
    },
    error(err) {
      console.log('[ERROR] example1', err);
    },
    complete() {
      console.log('[COMPLETE] example1');
    },
  });

  // custom$.subscribe({
  //   next(value) {
  //     // side effect 
  //     console.log('[NEXT] --2nd-- example1:', value);
  //   },
  // });


  // TODO 1b: next(), error(), complete()
  // TODO 2: each subscribe call generating fn
  // custom$.subscribe(fullObserver('example1'));
}






//======
setTimeout(() => {
  // ...
}, 2000);


// setTimeout(() => {
//   // ...
// }, Number.POSITIVE_INFINITY);


// TODO myTimeout$()
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

// 


// TODO task: myInterval$
export function myInterval$(delayInMs: number): Observable<number> {
  // HOT stream - producer is SHARED across all subscriptions
  // let i = 0;

  return new Observable((obs) => {
    // COLD stream - each subscription has separate, independent producer
    // COLD stream - producer is NOT shared
    let i = 0;
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

  // 2nd subscriber
  interval$.subscribe({
    next(value) {
      console.log('NEXT --2nd--- intervalTask', value);
    },
  });
  // 3rd subscriber

  setTimeout(() => {
    interval$.subscribe({
      next(value) {
        console.log('NEXT --3rd--- intervalTask', value);
      },
    });
  }, 4200);

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
  // intervalTask();
  // fromArrayTask();
  // fromArrayWithDelayTask();
  // throwTask();
  // rangeTask();
}
