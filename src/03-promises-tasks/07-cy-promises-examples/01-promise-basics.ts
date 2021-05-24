function syncValuePromise(value: number) {
  return new Promise(function (resolveFn, rejectFn) {
    resolveFn(value);
  });
}

function syncValuePromiseExample() {
  syncValuePromise(123)
    .then((value) => {
      console.log('syncP', value);
    });
}

function asyncValuePromise(value: number) {
  return new Promise(function (resolveFn, rejectFn) {
    setTimeout(() => {
      resolveFn(value);
    }, 2000);
  });
}

function asyncValuePromiseExample() {
  asyncValuePromise(997)
    .then((value) => {
      console.log('asyncP', value);
    });
}



export function promiseBasiscsApp() {
  // syncValuePromiseExample();
  // asyncValuePromiseExample();
}
