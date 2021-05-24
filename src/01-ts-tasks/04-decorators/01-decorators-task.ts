import { MyComputed, MyObservable } from "./src/my-decorators";

@MyComputed({
  fullName: ['firstName', 'lastName']
})
class Person {
  constructor(private id: number) {
  }

  @MyObservable() firstName: string;
  @MyObservable() lastName: string;

  fullName() {
    return [this.firstName, this.lastName].join(' ');
  }
}

function testComputed() {
  const bob = new Person(100);
  const ed = new Person(200);
  console.log('testObservable none:', bob.fullName);
  bob.firstName = 'Uncle';
  console.log('testObservable 1st:', bob.fullName);
  bob.lastName = 'BOB!';
  console.log('testObservable 2nd:', bob.fullName);
  console.log('ED:', ed.fullName);
}

export function decoratorsTaskApp() {
  testComputed();
}
