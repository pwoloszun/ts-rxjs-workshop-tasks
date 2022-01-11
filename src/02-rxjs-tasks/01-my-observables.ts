import { Observable, Observer, NEVER } from 'rxjs';

export function myCustom$(name: string): Observable<string> {

  return new Observable((obs) => {
    obs.next('a qq!');

    setTimeout(() => {
      obs.next('a qq! 2');
    }, 2000);

    obs.next('a qq! 3');
    obs.complete();
    // obs.error(new Error(`ola boga!`));
    // throw new Error(`ola boga!`)
  });

}

function example1() {
  const custom$ = myCustom$('bob'); // nothing happens

  // 
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


  const arr = [1, 2, 3]
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];

  }


  // TODO 1b: next(), error(), complete()
  // TODO 2: each subscribe call generating fn
  // custom$.subscribe(fullObserver('example1'));
}






//======

setTimeout(() => {

}, 2000);


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
export function myFromArray$(items: any[]): Observable<any> {
  return NEVER; // TODO
}

function fromArrayTask() {
  const names = ['bob', 'ed', 'kate'];
  myFromArray$(names)
    .subscribe(myFullObserver('fromArrayTask'));
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
export function myInterval$(delayInMs: number): Observable<number> {
  return NEVER; // TODO
}

function intervalTask() {
  myInterval$(1000)
    .subscribe(myFullObserver('intervalTask'));
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
  timeoutTask();
  // intervalTask();
  // fromArrayTask();
  // fromArrayWithDelayTask();
  // throwTask();
  // rangeTask();
}
