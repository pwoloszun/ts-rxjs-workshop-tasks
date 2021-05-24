import { MyIterator } from "./my-iterator";

export interface MyList<T> {
  add(item: T): void;

  iterator(): MyIterator<T>;
}
