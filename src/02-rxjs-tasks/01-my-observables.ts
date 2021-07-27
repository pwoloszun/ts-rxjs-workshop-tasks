import { Observable, Observer, NEVER } from 'rxjs';

export function myCustom$(name: string): Observable<string> {

  return new Observable((obs) => {
    console.log('generating Observable');
    // next
    obs.next('qq 1');

    setTimeout(() => {
      console.log('async call');

      obs.next('qq 2');
      obs.next('qq 3');
    }, 2000);

    obs.next('qq 4');

    // error
    // complete
    obs.complete();
    obs.error(new Error(`ola boga!`));
    // throw new Error(`ola boga!`);

  });

}

function example1() {
  console.log('exmpl 1');

  const custom$ = myCustom$('bob'); // nothing happens

  custom$.subscribe({
    next(value) {
      console.log('NEXT example 1', value);
    },

    error(err) {
      console.log('ERROR example 1', err);
    },

    complete() {
      console.log('COMPLETE example 1');
    },
  });

  // custom$.subscribe(
  //   (value) => {},
  //   null,
  //   () => {}
  // );

  // custom$.subscribe({
  //   next(v) {
  //     console.log('observer 2', v);
  //   }
  // });



  // custom$.subscribe((value: string) => console.log('[NEXT] timeout', value));
  // TODO 1b: next(), error(), complete()
  // TODO 2: each subscribe call generating fn
  // custom$.subscribe(fullObserver('example1'));
}










//======
setTimeout(() => {
  // do smth
}, 2000);


// TODO myTimeout$()
export function myTimeout$(delayInMs: number): Observable<void> {

  return new Observable((obs) => {
    const timeoutId = setTimeout(() => {
      obs.next();
      obs.complete();
    }, delayInMs);

    return () => { // cleanup
      console.log('cleanup myTimeout$');
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
  const names = ['bob', 'ed', 'kate', 'qq'];
  const names$ = myFromArray$(names);
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

  return new Observable((obs) => {
    for (let index = 0; index < count; index++) {
      const value = startValue + count;
      obs.next(value);
    }
    obs.complete();
  }); // TODO

}

function rangeTask() {
  const range$ = myRange$(5, 7); // 5, 6.., 11
  range$.subscribe(myFullObserver('rangeTask'));
}


// setInterval(() => {

// }, 2000);

// TODO task: myInterval$
export function myInterval$(delayInMs: number): Observable<number> {

  return new Observable((obs) => {
    let i = 0;

    setInterval(() => {
      obs.next(i);
      i += 1;
    }, delayInMs);

  });

}

function intervalTask() {
  const interval$ = myInterval$(1000);

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
      console.log('NEXT intervalTask 2nd', value);
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


// TODO task: myThrow$

// more TODO

// TODO task: myOf$

// TODO task: myTimer$

export function myObservablesApp() {
  // example1();
  // timeoutTask();
  // intervalTask();
  // fromArrayTask();
  // fromArrayWithDelayTask();
  throwTask();
  rangeTask();
}
