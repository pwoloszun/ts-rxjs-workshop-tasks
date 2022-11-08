import { fullObserver } from "./utils";
import { myInterval$, myTimeout$ } from './01-my-observables';

function example1() {
  const timeout$ = myTimeout$(3500);
  const subscription = timeout$.subscribe(fullObserver('unsubscribe timeout'));

  setTimeout(() => {
    console.log('Unsubscribe:',);
    subscription.unsubscribe();
  }, 2000);

  // timeout$.subscribe(fullObserver('--2nd-- unsubscribe timeout'));
}

// TODO: impl unsubscribe to: myInterval$()
function task1() {
  const interval$ = myInterval$(300);
  const subscription = interval$
    .subscribe(fullObserver('unsubscribe interval'));

  setTimeout(() => {
    console.log('Intervl Unsubscribe:',);
    subscription.unsubscribe();
  }, 2000);
}

export function mySubscriptionsApp() {
  // example1();
  task1();
}
