import * as $ from 'jquery';

function cyGetSimple(selector) {
  return new Promise((resolve) => {
    const $el = $(selector);
    if ($el.length > 0) {
      resolve($el);
    } else {
      throw new Error(`Can't find element: ${selector}`);
    }
  });
}

const MAX_TIMEOUT = 3000;
const RETRY_INTERVAL = 50;

function cyGetAdv(selector) {
  return new Promise((resolve) => {
    let $el = $(selector);
    if ($el.length > 0) {
      resolve($el);
    } else {
      const intervalId = setInterval(() => {
        $el = $(selector);
        if ($el.length > 0) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          resolve($el);
        }
      }, RETRY_INTERVAL);
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        throw new Error(`Can't find element: ${selector}`);
      }, MAX_TIMEOUT);
    }
  });
}

function simpleGetElementTask() {
  cyGetSimple('h3')
    .then(($el: any) => {
      const text = $el.text();
      console.log('simpleGetElementTask', $el);
      return text;
    })
    .then((text: string) => {
      console.log('simpleGetElementTask TEXT', text);
    });
}

function advGetElementTask() {
  cyGetAdv('#todos-list li')
    .then(($el: any) => {
      return $el.length;
    })
    .then((todosCount: number) => {
      console.log('advGetElementTask todos count', todosCount);
    });
}

export function cyPromiseTasksApp() {
  // simpleGetElementTask();
  // advGetElementTask();
}

