function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {

  const originalMethod = descriptor.value;

  //editing the descriptor/value parameter
  descriptor.value = function (...args: any[]) {
    console.log(`method ${propertyKey}() called, with:`, args);
    return originalMethod.apply(this, args);
  };

  // return edited descriptor as opposed to overwriting the descriptor
  return descriptor;
}

class Person {
  constructor(public name: string) {
  }

  @logMethod
  setName(value: string): void {
    this.name = value;
  }
}

export function methodDecoratorApp() {
  const p = new Person('bob');
  p.setName('ed');
}
