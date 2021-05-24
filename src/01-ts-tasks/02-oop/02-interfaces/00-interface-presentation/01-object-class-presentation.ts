// ======
// class/object interface
interface Person {
  age: number;

  setAge(age: number);

  getName(): string;
}

export class Patient implements Person {
  age: number;

  constructor(private name) {
  }

  setAge(age: number) {
  }

  getName(): string {
    return this.name;
  }
}

// duck typing - only SHAPE matters
function testPersonInterface() {
  // class instance
  let ed: Person = new Patient("ed");

  // object literal
  let bob: Person = {
    age: 12,
    setAge(a: number) {
    },
    getName(): string {
      return "";
    }
  };

}
