import { Observable, Observer, NEVER } from 'rxjs';

export function myCustom$(name: string): Observable<string> {

  return new Observable((obs) => {
    obs.next('a qq!');
    obs.next('a qq! 3');
    obs.complete();

    obs.complete();
    obs.error(new Error());
  });

}

// client code
function example1() {
  const custom$ = myCustom$('bob'); // nothing happens

  custom$.subscribe({
    next(value) {
      console.log('NEXT example1:', value);
    },
    error(err) {
      console.log('ERROR example1:', err);
    },
    complete() {
      console.log('COMPLETE example1:');
    },
  });

  custom$.subscribe({
    next(value) {
      console.log('NEXT 22 example1:', value);
    },
    error(err) {
      console.log('ERROR 22 example1:', err);
    },
    complete() {
      console.log('COMPLETE 22 example1:');
    },
  });




  // TODO 1b: next(), error(), complete()
  // TODO 2: each subscribe call generating fn
  // custom$.subscribe(fullObserver('example1'));
}


//======







// setTimeout(() => {
//   // ...
// }, 2000);

// TODO myTimeout$()
export function myTimeout$(delayInMs: number): Observable<void> {

  return new Observable((obs) => {
    const timeoutId = setTimeout(() => {
      // console.log('TIMEOUT: mem leak',);
      obs.next();
      obs.complete();
    }, delayInMs);

    return () => { // cleanup
      // console.log('CLEANUP:',);
      clearTimeout(timeoutId);
    };
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

  return new Observable((obs) => {
    let i = 0; // hot stream

    const intervalId = setInterval(() => {
      // console.log('INTERVAL:',);
      obs.next(i);
      i += 1;
    }, delayInMs);

    return () => {
      // cleanup
      clearInterval(intervalId);
    };
  });

}

function intervalTask() {
  const interval$ = myInterval$(1000)

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
      console.log('NEXT 22 intervalTask', value);
    },
    error(err) {
      console.log('ERROR 22 intervalTask', err);
    },
    complete() {
      console.log('COMPLETE 22 intervalTask');
    },
  });
}

// TODO task: myFullObserver(tag)
function myFullObserver(tag: string): Observer<any> {
  return {
    next(value) {
      console.log(`NEXT ${tag}`, value);
    },
    error(err) {
      console.log(`ERROR ${tag}`, err);
    },
    complete() {
      console.log(`COMPLETE ${tag}`);
    },
  };
}

// TODO task: myFromArray$
export function myFromArray$<T>(items: T[]): Observable<T> {

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


  names$.subscribe(myFullObserver('fromArrayTask'));


  // myFromArray$([123, 456, 789]).subscribe({
  //   next(value) {
  //     console.log('NEXT fromArrayTask', value);
  //   }
  // })
}

// TODO task: myRange$
export function myRange$(startValue: number, count: number): Observable<number> {

  return new Observable((obs) => {
    for (let index = 0; index < count; index++) {
      const value = startValue + index;
      obs.next(value);
    }
    obs.complete();
  });

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

  return new Observable((obs) => {
    obs.error(error);
  });

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
  // fromArrayTask();
  // fromArrayWithDelayTask();
  throwTask();
  rangeTask();
}
