import { fullObserver } from "./utils";
import { myInterval$, myTimeout$ } from './01-my-observables';

function example1() {
  const timeout$ = myTimeout$(3500);
  const subscription = timeout$.subscribe(fullObserver('unsubscribe timeout'));

  setTimeout(() => {
    console.log('UNSUBSCRIBE:',);
    subscription.unsubscribe();
  }, 2000);
}

// TODO: impl unsubscribe to: myInterval$()
function task1() {
  // TODO
}

export function mySubscriptionsApp() {
  example1();
  // task1();
}
