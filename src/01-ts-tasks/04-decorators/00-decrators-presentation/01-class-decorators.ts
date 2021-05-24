function logClass(target: any) {
  const newClassCtor: any = function (...args) {
    console.log("New:", target.name);
    return target.apply(this, args);
  };

  newClassCtor.prototype = target.prototype;

  // return new constructor (will override original)
  return newClassCtor;
}


@logClass
class Person {
  constructor(private name: string) {
  }
}

export function logClassApp() {
  new Person('bob');
}


