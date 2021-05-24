export class Monkey {
  name: string; // default: public
  public age: number;

  constructor(name: string, age: number = 12) {
    this.name = name;
    this.age = age;
  }

  getName(): string {
    return this.name;
  }

  setAge(age: number) {
    this.age = age;
  }
}

export function propertiesMethodsApp() {
  let coco: Monkey = new Monkey("Coco", 3);
  coco.setAge(15);
  console.log("monkey", coco.getName(), coco.name, coco.age);
}


