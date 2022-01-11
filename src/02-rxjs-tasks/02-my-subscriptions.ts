import { fullObserver } from "./utils";
import { myInterval$, myTimeout$ } from './01-my-observables';

function example1() {
  const timeout$ = myTimeout$(3500);
  const subscription = timeout$.subscribe(fullObserver('unsubscribe timeout'));

  setTimeout(() => {
    subscription.unsubscribe();
  }, 2000);
}


// const intervalId = setInterval(() => {

// }, 20000);

// clearInterval(intervalId)

// TODO: impl unsubscribe to: myInterval$()
function task1() {
  const interval$ = myInterval$(500);

  const subscription = interval$.subscribe(fullObserver('task1'));

  setTimeout(() => {
    subscription.unsubscribe();
  }, 3600);

}

export function mySubscriptionsApp() {
  // example1();
  task1();
}
