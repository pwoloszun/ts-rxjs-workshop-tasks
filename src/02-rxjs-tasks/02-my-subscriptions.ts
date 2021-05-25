import { fullObserver } from "./utils";
import { myInterval$, myTimeout$ } from './01-my-observables';

function example1() {
  const timeout$ = myTimeout$(5500);
  const subscription = timeout$.subscribe(fullObserver('unsubscribe timeout'));

  setTimeout(() => {
    console.log('client code: unsub');
    subscription.unsubscribe();
  }, 2000);
}

// TODO: impl unsubscribe to: myInterval$()
function task1() {
  const inter$ = myInterval$(500); // single stream instance

  const subscription1 = inter$.subscribe(fullObserver('inter 1st'));
  const subscription2 = inter$.subscribe(fullObserver('inter 2nd'));

  setTimeout(() => {
    console.log('1st unsub');
    subscription1.unsubscribe();
  }, 2200);

  setTimeout(() => {
    console.log('2nd unsub');
    subscription2.unsubscribe();
  }, 6400);
}

export function mySubscriptionsApp() {
  // example1();
  task1();
}
