import { Observable, Observer, NEVER } from 'rxjs';

export function myCustom$(name: string) {

  return new Observable<string>(function (obs) {
    console.log('generating Observable');
    // next
    obs.next(`batman! ${name}`);
    setTimeout(() => {
      obs.next('batman 2');

      obs.complete();
    }, 2000);
    obs.next('batman 3');

    // obs.error(new Error(`ola boga!`));
    // throw new Error(`ola boga! 22`);
  });

}

function example1() {
  const custom$ = myCustom$('bob'); // nothing happens
  custom$.subscribe({
    next(value: string) {
      console.log('[NEXT] example1', value);
    },
    error(err: Error) {
      console.log('[ERROR] example1', err);
    },
    complete() {
      console.log('[COMPLETE] example1');
    },
  });

  // custom$.subscribe({
  //   next(value: string) {
  //     console.log('[NEXT] 2nd', value);
  //   },
  //   error(err: Error) {
  //     console.log('[ERROR] 2nd', err);
  //   },
  //   complete() {
  //     console.log('[COMPLETE] 2nd');
  //   },
  // });


  // TODO 1b: next(), error(), complete()
  // TODO 2: each subscribe call generating fn
  // custom$.subscribe(fullObserver('example1'));
}


//======




// TODO myTimeout$()
export function myTimeout$(delayInMs: number): Observable<void> {

  return new Observable<void>((obs) => {

    const timeoutId = setTimeout(() => {
      obs.next();
      obs.complete();
    }, delayInMs);


    return () => { // cleanup fn
      console.log('CLEANUP timeout');
      clearTimeout(timeoutId);
    };
  });

}

function timeoutTask() {
  const timeout$ = myTimeout$(2000); // nothing happens
  timeout$.subscribe(myFullObserver('timeoutTask'));
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
  return new Observable<void>((obs) => {
    items.forEach((el) => obs.next(el));
    obs.complete();
  });
}

function fromArrayTask() {
  const names = ['bob', 'ed', 'kate'];
  myFromArray$(names)
    .subscribe({
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


  myFromArray$([123, 456, 789])
    .subscribe({
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
  myRange$(5, 7)
    .subscribe(myFullObserver('rangeTask'));
}

// TODO task: myInterval$
// instant op
// console.log('instant');

// const intervalId = setInterval(() => {
//   console.log('each 3sec');
// }, 3000);

// clearInterval(intervalId);


export function myInterval$(delayInMs: number): Observable<number> {

  return new Observable<number>((obs) => {
    let i = 0; // cold aka stateless
    const intervlaId = setInterval(() => {
      obs.next(i);
      i += 1;
    }, delayInMs);

    return () => { // clean up
      console.log('INTERV clean up');
      clearInterval(intervlaId);
    };
  });

}

function intervalTask() {
  const interval$ = myInterval$(2000);

  interval$
    .subscribe({
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


// TODO task: myThrow$

// more TODO

// TODO task: myOf$

// TODO task: myTimer$

export function myObservablesApp() {
  console.log('qq');
  // example1();
  // timeoutTask();
  // intervalTask();
  fromArrayTask();
  // fromArrayWithDelayTask();
  // throwTask();
  // rangeTask();
}
