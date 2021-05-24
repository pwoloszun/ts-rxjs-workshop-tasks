import { greetWith } from "./my-utils/greeter";

export function moduleTaskApp() {
  console.log('moduleTaskApp', greetWith('Bob'));
}
