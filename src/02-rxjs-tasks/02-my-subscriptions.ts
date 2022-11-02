import { fullObserver } from "./utils";
import { myInterval$, myTimeout$ } from './01-my-observables';

function example1() {
  console.log('example1 START:',);
  const timeout$ = myTimeout$(3500);
  const subscription = timeout$.subscribe(fullObserver('unsubscribe timeout'));

  setTimeout(() => {
    subscription.unsubscribe();
  }, 2000);
}

// TODO: impl unsubscribe to: myInterval$()
function task1() {
  const interval$ = myInterval$(300);
  const subscription = interval$
    .subscribe(fullObserver('unsub Interval'));

  setTimeout(() => {
    subscription.unsubscribe();
  }, 2000);
}

export function mySubscriptionsApp() {
  example1();
  task1();
}
