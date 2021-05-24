import { Monkey } from "../02-oop/01-classes/00-classes-presentation/01-properties-methods";

// TODO: introduce generic type
function toArray(item: any, count: number): any[] {
  let result: any[] = [];
  for (let i = 0; i < count; i++) {
    result.push(item);
  }
  return result;
}


function genericFunctionsApp() {
  let names: string[] = toArray("bob", 4);
  let monkeys: Monkey[] = toArray(new Monkey("bamboo", 12), 5);

  console.log("genericFunctionsApp", names, monkeys);
}
