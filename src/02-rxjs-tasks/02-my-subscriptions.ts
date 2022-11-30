import { fullObserver } from "./utils";
import { myInterval$, myTimeout$ } from './01-my-observables';
import { Subscription } from 'rxjs';

function example1() {
  const timeout$ = myTimeout$(500);
  const subscription: Subscription = timeout$.subscribe(fullObserver('unsubscribe timeout'));

  setTimeout(() => {
    console.log('Clinet code UNSUB');
    subscription.unsubscribe();
  }, 2000);
}


// clearInterval(intervalId)

// TODO: impl unsubscribe to: myInterval$()
function task1() {
  // TODO
}

export function mySubscriptionsApp() {
  example1();
  task1();
}
