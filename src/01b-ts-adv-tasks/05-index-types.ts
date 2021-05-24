// string literal types
type Status = "logged-in" | "logged-out" | "not-registered";


// index types
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Todo {
  id: number;
  title: string;
  description: string;
}

let buyMilk: Todo = {
  id: 100,
  title: 'buyMilk',
  description: 'it\'s important!'
};

let strings: string[] = pluck(buyMilk, ['title']); // ok, string[]

let personProps: keyof Todo; // 'id' | 'title' | 'description'
