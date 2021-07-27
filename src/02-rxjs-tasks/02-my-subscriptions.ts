import { fullObserver } from "./utils";
import { myInterval$, myTimeout$ } from './01-my-observables';
import { fullObserver } from './utils/index';

function example1() {
  const timeout$ = myTimeout$(5500);

  const subscription = timeout$.subscribe(
    fullObserver('timeout unsub')
  );

  setTimeout(() => {
    console.log('unsubsc');
    subscription.unsubscribe();
  }, 2000);
}

// TODO: impl unsubscribe to: myInterval$()
function task1() {
  // TODO
  // create interval stream with delay = 1000ms
  const interval$ = myInterval$(500);

  // subscribe
  const sub = interval$.subscribe(
    fullObserver('interv task1')
  );

  // async after 3,5s unsub
  setTimeout(() => {
    console.log('unsub interv');

    sub.unsubscribe();
  }, 3500);
}

export function mySubscriptionsApp() {
  // example1();
  task1();
}
