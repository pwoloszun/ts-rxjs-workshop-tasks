import { Observable, Observer, NEVER } from 'rxjs';

export function myCustom$(name: string): Observable<number> {

  return new Observable((obs) => {
    obs.next(1);

    setTimeout(() => {
      obs.next(22);
      obs.next(333);
    }, 2000);

    // obs.error(new Error(`sdadsa`));

    // throw new Error(`sdadsa`);

    obs.next(4444);
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


  setTimeout(() => {
    custom$.subscribe({
      next(value) {
        console.log('[NEXT] 2nd example1:', value);
      },
    });
  }, 3000);

  // TODO 1b: next(), error(), complete()
  // TODO 2: each subscribe call generating fn
  // custom$.subscribe(fullObserver('example1'));
}


//======
// API
// setTimeout(() => {
// }, 3000);

// TODO myTimeout$()
export function myTimeout$(delayInMs: number): Observable<void> {

  return new Observable((obs) => {
    const timeoutId = setTimeout(() => {
      console.log('LEAK!!:',);
      obs.next();
      obs.complete();
    }, delayInMs);

    return () => {
      // cleanup
      // console.log('CLEANUP:',);
      clearTimeout(timeoutId);
      // clearInterval
    };
  });

}

function timeoutTask() {
  const timeout$ = myTimeout$(4000); // nothing happens
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


setInterval(() => {

}, 2000);



// TODO task: myInterval$
export function myInterval$(delayInMs: number): Observable<number> {

  return new Observable((obs) => {
    let i = 0;
    const intervalId = setInterval(() => {
      console.log('LEAK:',);
      obs.next(i);
      i += 1;
    }, delayInMs);

    return () => {// cleanup
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
      console.log('NEXT 222 intervalTask', value);
    },
  });
}

// TODO task: myFullObserver(tag)
function myFullObserver<T>(tag: string): Observer<T> {
  return {
    next(value) {
      console.log(`[NEXT] ${tag}`, value);
    },
    error(err) {
      console.log(`[ERROR] ${tag}`, err);
    },
    complete() {
      console.log(`[COMPLETE] ${tag}`);
    },
  };
}

// TODO task: myFromArray$
export function myFromArray$(items: T[]): Observable<T> {

  return new Observable((obs) => {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      obs.next(element);
    }
    obs.complete();
  });

}

function fromArrayTask() {
  const names$ = myFromArray$(['bob', 'ed', 'kate']);
  const myNumbers$ = myFromArray$([11, 22, 333]);

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
}

// TODO task: myRange$
export function myRange$(startValue: number, count: number): Observable<number> {

  return new Observable((obs) => {
    for (let index = startValue; index < startValue + count; index++) {
      obs.next(index);
    }
    obs.complete();
  });

}

function rangeTask() {
  const range$ = myRange$(5, 7);
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
  const throw$ = myThrow$(new Error('Jakis blad!'));

  throw$.subscribe(myFullObserver('throwTask'));
}

// TODO task: myOf$

export function myObservablesApp() {
  // example1();
  // timeoutTask();
  // timeoutTask();
  // intervalTask();
  // fromArrayTask();
  // fromArrayWithDelayTask();
  throwTask();
  // rangeTask();
}
