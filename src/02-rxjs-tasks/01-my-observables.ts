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


// TODO myTimeout$()
export function myTimeout$(delayInMs: number): Observable<void> {
  return NEVER; // TODO
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
  example1();
  // timeoutTask();
  // intervalTask();
  // fromArrayTask();
  // fromArrayWithDelayTask();
  // throwTask();
  // rangeTask();
}
