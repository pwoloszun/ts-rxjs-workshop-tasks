// ======
// union types
function createMerged<T, U>(first: T, second: U): T & U {
  let mergeResult = <T & U>{};
  for (let id in first) {
    (<any>mergeResult)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!mergeResult.hasOwnProperty(id)) {
      (<any>mergeResult)[id] = (<any>second)[id];
    }
  }
  return mergeResult;
}

class Person {
  constructor(public name: string) {
  }
}

class Logger {
  getLog() {
    return 'log call';
  }
}

type PersonLogger = Person & Logger; // alias

function mergedExample() {
  let bobLogger: PersonLogger;
  bobLogger = createMerged(new Person("bob"), new Logger());
  console.log('mergedExample', bobLogger.name, bobLogger.getLog());
}

export function intersectionTypesApp() {
  // mergedExample();
}
