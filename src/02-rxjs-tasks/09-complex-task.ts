import { throwError, interval, of } from "rxjs";
import { catchError, delay, map, retry, take, tap, mergeMap, mergeAll } from "rxjs/operators";

import { fullObserver } from "./utils";

const delayInMs = 1200;

// TODO: fake successful API call
// logs '<URL> REQUEST...'
// delayed by given ms
// returns {url, data, status: 'SUCCESS'}
function apiCall$(url: string, data: object) {
  return null;
}

// TODO: fake error API call
// logs callCount
// delayed by 1.8s
// always throws given error
function errorApiCall$(url: string, errorMsg = 'Some API error') {
  return null;
}

function createErrorModal() {
  const cssClass = 'show';
  const modalContEl = document.querySelector('.modal')!;
  return {
    show(msg: string, seconds: number): void {
      modalContEl.innerHTML = 'a qq!';
      modalContEl.classList.add(cssClass);
      modalContEl.classList.remove(cssClass)
      // TODO show modal with message -> each sec count down -> hide modal
    },
  };
}

// TODO
// call errorApiCall$('Can\'t find User')
// retry 2 times
// handle error: 1) show modal; 2) log error on server
function handleError() {
}

export function complexTaskApp() {
  // handleError();
}
