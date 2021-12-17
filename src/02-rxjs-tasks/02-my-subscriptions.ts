import { fullObserver } from "./utils";
import { myInterval$, myTimeout$ } from './01-my-observables';

function example1() {
  const timeout$ = myTimeout$(5500);
  const subscription = timeout$.subscribe(fullObserver('unsubscribe timeout'));

  setTimeout(() => {
    console.log('UNSUBSCRIBE:',);
    subscription.unsubscribe();
  }, 2000);
}

// TODO: impl unsubscribe to: myInterval$()
// clearInterval(id);
function task1() {
  const interval$ = myInterval$(1000);

  const subscription = interval$.subscribe(fullObserver('interval task 1'));

  setTimeout(() => {
    subscription.unsubscribe();
  }, 5500);
}

export function mySubscriptionsApp() {
  example1();
  // task1();
}
