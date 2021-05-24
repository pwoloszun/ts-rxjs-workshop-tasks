const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function doNothing(...params: any[]) {
}

function triggerCallbacks({onSuccessFn = doNothing, onErrorFn = doNothing}) {
  if (this.state === RESOLVED) {
    onSuccessFn(this.value);
  } else if (this.state === REJECTED) {
    onErrorFn(this.error);
  } else {
    throw new Error(`Promise wrong state: ${this.state}`);
  }
}

function resolveFn(data) {
  if (this.state !== PENDING) {
    return;
  }
  this.state = RESOLVED;
  this.value = data;
  this.queue.forEach((callbacks) => {
    triggerCallbacks.call(this, callbacks);
  });
  this.queue = [];
}

function rejectFn(error) {
  if (this.state !== PENDING) {
    return;
  }
  this.state = REJECTED;
  this.error = error;
  this.queue.forEach((callbacks) => {
    triggerCallbacks.call(this, callbacks);
  });
  this.queue = [];
}

export default class MyPromise {
  private queue: any[];
  private state: string;
  private value: any;
  private error: Error;


  constructor(fn) {
    this.queue = [];
    this.state = PENDING;
    this.value = null;
    this.error = null;
    fn(resolveFn.bind(this), rejectFn.bind(this));
  }

  then(onSuccessFn, onErrorFn) {
    if (this.state !== PENDING) {
      triggerCallbacks.call(this, {onSuccessFn, onErrorFn});
    } else {
      this.queue.push({onSuccessFn, onErrorFn});
    }
  }
}
