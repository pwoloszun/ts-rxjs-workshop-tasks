import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { interval } from "rxjs";

import { fullObserver } from "../utils";

function makeHot(cold: Observable<any>) {
  const subject = new Subject();
  const mainSubscription = cold.subscribe(subject);
  let refs = 0;
  return new Observable((obs) => {
    refs++;
    let sub = subject.subscribe(obs);
    return () => {
      refs--;
      if (refs <= 0) {
        mainSubscription.unsubscribe();
      }
      sub.unsubscribe();
    };
  });
}

function hotStreamExample() {
  const interval$ = interval(1000);
  const hotInterval$ = makeHot(interval$);
  hotInterval$.subscribe(fullObserver('hot 1ST'));
  setTimeout(() => {
    hotInterval$.subscribe(fullObserver('hot 2ND'));
  }, 3500);
}

export function hotObservableApp() {
  // hotStreamExample();
}
