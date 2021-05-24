import { MyIterator } from "./my-iterator";

export class ArrayIterator<T> implements MyIterator<T> {
  private currentIndex: number = 0;

  constructor(private items: T[]) {
  }

  hasNext(): boolean {
    return this.currentIndex < this.items.length;
  }

  next(): T {
    let item: T = this.items[this.currentIndex];
    this.currentIndex++;
    return item;
  }
}
