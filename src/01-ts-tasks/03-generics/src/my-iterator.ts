export interface MyIterator<T> {
  hasNext(): boolean;

  next(): T;
}
