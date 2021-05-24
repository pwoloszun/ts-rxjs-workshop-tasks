function valA() {
  return new Promise((resolve) => {
    resolve('A');
  });
}

function valD() {
  return new Promise((resolve) => {
    resolve('D');
  });
}

function valDelayedE() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('E');
    }, 1600);
  });
}

function valDelayedF() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('F');
    }, 1600);
  });
}

function promiseChainExample() {
  valA()
    .then((val) => {
      console.log('A from promise ==', val);
      return 'bb';
    })
    .then((val) => {
      console.log('bb ==', val);
      return 'cc';
    })
    .then((val) => {
      console.log('cc ==', val);
      const valDPromise = valD();
      return valDPromise;
    })
    .then((val) => {
      console.log('D from promise ==', val);
      const valEPromise = valDelayedE();
      return valEPromise;
    })
    .then((val) => {
      console.log('E from promise ==', val);
      const valFPromise = valDelayedF();
      return valFPromise;
    })
    .then((val) => {
      console.log('F from promise ==', val);
      console.log('=== end ===');
    });
}

export function promiseChainingApp() {
  // promiseChainExample();
}
