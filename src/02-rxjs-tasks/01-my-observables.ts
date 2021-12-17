import { Observable, Observer, NEVER } from 'rxjs';


// const arr = [];

// PULL
// function clientCode() {
//   for (let index = 0; index < arr.length; index++) {
//     const element = arr.getItem();
//     // do smth with el
//   }
// }


// // observer DP
// const subject = {}

// //PUSH
// function clientCodePush() {
//   subject.subscribe((element) => {
//     // do smth with el
//   });
// }


export function myCustom$(name: string): Observable<string> {

  return new Observable(function (obs) {
    obs.next('a qq!');

    setTimeout(() => {
      obs.next('a qq! 2nd');
    }, 2000);

    obs.next('a qq! 3rd');

    // throw new Error(`Ola boga!`);
    // obs.error(new Error(`Ola boga!`));
  });

}

function example1() {
  const custom$ = myCustom$('bob'); // nothing happens

  custom$.subscribe({
    next(value) {
      console.log('NEXT client code:', value);
    },
    complete() {
      console.log('COMPLETE client code');
    },
    error(err) {
      console.log('ERROR client code', err);
    }
  });

  setTimeout(() => {

    custom$.subscribe({
      next(value) {
        console.log('NEXT ==2nd== client code:', value);
      },
    });
  }, 3000);


  // custom$.subscribe((value: string) => console.log('[NEXT] timeout', value));
  // TODO 1b: next(), error(), complete()
  // TODO 2: each subscribe call generating fn
  // custom$.subscribe(fullObserver('example1'));
}








//======


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







// TODO task: myFullObserver(tag)
function myFullObserver(tag: string): Observer<any> {
  return null as any as Observer<any>;
}

// TODO task: myFromArray$
export function myFromArray$<T>(items: T[]): Observable<T> {
  return NEVER; // TODO
}

function fromArrayTask() {
  const names = ['bob', 'ed', 'kate'];
  const array$ = myFromArray$(names);

  array$.subscribe({
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

  array$.subscribe(myFullObserver('fromArrayTask'));
}

// TODO task: myRange$
export function myRange$(startValue: number, count: number): Observable<number> {
  return NEVER; // TODO
}

function rangeTask() {
  myRange$(5, 7)
    .subscribe(myFullObserver('rangeTask'));
}


// setInterval(() => {

// }, 2000);

// TODO task: myInterval$
export function myInterval$(delayInMs: number): Observable<number> {

  return new Observable((obs) => {
    let i = 0; // cold
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

  setTimeout(() => {
    interval$.subscribe({
      next(value) {
        console.log('NEXT intervalTask OTHER', value);
      },
    });
  }, 2500);

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
  // example1();

  // timeoutTask();
  intervalTask();
  // fromArrayTask();
  // fromArrayWithDelayTask();
  // throwTask();
  // rangeTask();
}
