class MyPerson {
  constructor(private name: string) {
  }

  getName() {
    return this.name;
  }
}

function peopleFactory(name: string, ctor: typeof MyPerson) {
  return new ctor(name);
}

const bob = peopleFactory('Bob', MyPerson);
