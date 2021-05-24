function logProperty(target: any, propertyKey: string): void {
  let propertyValue = target[propertyKey];
  Object.defineProperty(target, propertyKey, {
    get(): any {
      console.log(`get ${propertyKey}`, propertyValue);
      return propertyValue;
    },
    set(value: any) {
      console.log(`set ${propertyKey}`, value);
      propertyValue = value;
    },
    enumerable: true,
    configurable: true
  });
}


class Person {
  @logProperty
  public name: string;

  constructor(name: string) {
  }
}

export function propertyDecoratorsApp() {
  const p = new Person('bob');
  p.name = "Kate!";
  const n = p.name;
  console.log('propertyDecoratorsApp');
}

