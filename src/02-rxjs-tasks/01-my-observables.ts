import { Observable, Observer, NEVER } from 'rxjs';
import { fullObserver } from './utils/index';

export function myCustom$(): Observable<number> {

  let i = 0; // state stream
  // pseudo code
  // const subscribersList = [];

  return new Observable((obs: Observer<number>) => {

    setInterval(() => {
      obs.next(i++);
    }, 1000)

  });

}





function example1() {

  const custom$ = myCustom$(); // nothing happens

  custom$.subscribe(fullObserver('1st subscriber'));
  custom$.subscribe(fullObserver('2nd subscriber'));


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
      console.log('mem leak');

      obs.next();
      obs.complete();
    }, delayInMs);

    return () => {
      console.log('cleanup');
      // ...
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
      const value = startValue + index;
      obs.next(value);
    }
    obs.complete();
  }); // TODO

}

function rangeTask() {
  const range$ = myRange$(5, 7); // 5, 6.., 11
  range$.subscribe(myFullObserver('rangeTask'));
}


// const intervalid = setInterval(() => {
//   //do smth
// }, 2000);

// clearInterval(intervalid);

// TODO task: myInterval$
export function myInterval$(delayInMs: number): Observable<number> {

  return new Observable((obs) => {
    let i = 0;

    const intervalId = setInterval(() => {
      obs.next(i);
      i += 1;
    }, delayInMs);

    // cleanup
    return () => {
      clearInterval(intervalId);
    };
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


// const MY_NEVER = new Observable((obs) => {});
// MY_NEVER.subscribe(fullObserver('my never'));

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
  example1();
  // timeoutTask();
  // intervalTask();
  // fromArrayTask();
  // fromArrayWithDelayTask();
  // throwTask();
  // rangeTask();
}
