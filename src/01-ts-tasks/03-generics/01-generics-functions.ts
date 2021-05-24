// TODO 1: MapIterator interface; gMap function
interface MapIterator<T, K> {
  (el: T, index: number): K;
}

function gMap<T, K>(list: T[], iterator: MapIterator<T, K>): K[] {
  let mappedList: K[] = [];
  for (let i: number = 0; i < list.length; i++) {
    mappedList.push(iterator(list[i], i));
  }
  return mappedList;
}

// TODO 2: FilterIterator interface; gFilter function
interface FilterIterator<T> {
  (el: T, index: number): boolean;
}

function gFilter<T>(list: T[], iterator: FilterIterator<T>): T[] {
  let filteredList: T[] = [];
  for (let i: number = 0; i < list.length; i++) {
    let el: T = this[i];
    if (iterator(el, i)) {
      filteredList.push(el);
    }
  }
  return filteredList;
}

// TODO 3: AllIterator interface; gAll function
interface AllIterator<T> {
  (el: T, index: number): boolean;
}

function gAll<T>(list: T[], iterator: AllIterator<T>): boolean {
  let item: T;
  for (let i: number = 0; i < list.length; i++) {
    item = list[i];
    if (!iterator(item, i)) {
      return false;
    }
  }
  return true;
}

// TODO 4: SliceIterator interface; gEachSlice function
interface SliceIterator<T> {
  (elementsSlice: T[], index: number): void;
}

function gEachSlice<T>(list: T[], sliceIterator: SliceIterator<T>, sliceSize: number): void {
}

// TODO 5: ReduceIterator interface; gReduce function
interface ReduceIterator<T, K> {
  (memo: K, element: T, index: number, list: T[]): K;
}

function gReduce<A, B>(list: A[], iterator: ReduceIterator<A, B>, memo: B): B {
  return null;
}

// TODO 6: gPluck function
function gPluck<T>(list: Object[], propertyName: string): T[] {
  return [];
}

// TODO 7: interfaces: GroupByIterator & Grouped; gGroupBy function
interface GroupByIterator<T> {
  (el: T, index: number): string;
}

interface Grouped<T> {
  [key: string]: T[];
}

function gGroupBy<T>(list: T[], iterator: GroupByIterator<T>): Grouped<T> {
  return {};
}
