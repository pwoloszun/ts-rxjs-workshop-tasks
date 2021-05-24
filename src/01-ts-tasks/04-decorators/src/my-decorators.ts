import { Evented } from "../../02-oop/03-timer-task/src/Evented";

function MyObservable() {
  return function (target: any, propertyKey: string): void {
    let propertyValue = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
      get(): any {
        // console.log(`get ${propertyKey}`);
        return propertyValue;
      },
      set(value: any) {
        // console.log(`set ${propertyKey}`, value);
        propertyValue = value;
        this._evented.trigger(propertyKey);
      },
      enumerable: true,
      configurable: true
    });

  };
}


interface ComputedParams {
  [computedPropName: string]: string[];
}

function MyComputed(params) {
  return function (target: any) {
    const computedProps = Object.getOwnPropertyNames(params);
    const originalFunctions = {};
    computedProps.forEach(function (computedProp) {
      originalFunctions[computedProp] = target.prototype[computedProp];
    });

    const newClassCtor: any = function (...args) {
      this._evented = new Evented();
      computedProps.forEach((computedProp) => {
        const propsToObserve = params[computedProp];
        const orignalFn = originalFunctions[computedProp];
        propsToObserve.forEach((prop) => {
          this._evented.on(prop, () => {
            this[computedProp] = orignalFn.call(this);
          });
        });
        this[computedProp] = undefined;
      });
      return target.apply(this, args);
    };

    newClassCtor.prototype = target.prototype;
    return newClassCtor;
  };

}

export {
  MyObservable,
  MyComputed,
};
