import { MyList } from "./my-list";
import { MyIterator } from "./my-iterator";
import { ArrayIterator } from "./array-iterator";

export class ArrayList<T> implements MyList<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  iterator(): MyIterator<T> {
    return new ArrayIterator(this.items);
  }
}
