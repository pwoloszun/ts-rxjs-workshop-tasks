import { ArrayList } from "./src/array-list";
import { Patient } from "../02-oop/02-interfaces/00-interface-presentation/01-object-class-presentation";
import { MyIterator } from "./src/my-iterator";

export function arrayListTaskApp() {
  let people: ArrayList<Patient> = new ArrayList<Patient>();

  people.add(new Patient("Bob"));
  people.add(new Patient("Ed"));
  people.add(new Patient("Kate"));

  let iterator: MyIterator<Patient> = people.iterator();
  while (iterator.hasNext()) {
    let person: Patient = iterator.next();
    console.log("next person:", person.getName());
  }
}
