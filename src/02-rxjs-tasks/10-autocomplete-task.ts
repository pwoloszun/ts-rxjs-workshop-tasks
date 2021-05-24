import { fromEvent, Observable, of } from "rxjs";
import { debounceTime, delay, distinctUntilChanged, map, switchMap } from "rxjs/operators";

import { fullObserver } from "./utils";

const delayInMs = 1800;

function querySearch$(query: string): Observable<string[]> {
  const results = [
    query,
    `Another ${query}`
  ];
  const count = Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    results.push(`${query} ${Math.random()}`);
  }
  return of(results).pipe(
    delay(delayInMs)
  );
}

// TODO
// on key up
// get query field value
// filter only changed values
// debounce 300
// for each new query send request on server BUT cancel all pending requests and handle only latest one
// render results in resultsContEl
function initAutocomplete() {
  const queryFieldEl = document.querySelector('.search-form .query-field');
  const resultsContEl = document.querySelector('.search-form .results-container');

  // TODO
  // console.log('initAutocomplete', queryFieldEl, resultsContEl);
}

function renderListItems(contEl: Element, items: string[]) {
  contEl.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
}

export function autocompleteTaskApp() {
  initAutocomplete();
}
