//TODO

// MapFunction function interface

// MergeFunction function interface
interface MergeFunction {
  (destination: Object, source: Object): Object;
}

// ReduceFunction function interface
interface ReduceFunction {
  (list: any[], iterator: Function): any;
}

// All function interface
interface AllFunction {
  (list: any[], test: Function): boolean;
}

// Pluck function interface
interface PluckFunction {
  (list: Object[], propertyName: string): any[];
}

// GroupBy function interface
interface GroupByFunction {
  (list: any[], iterator: Function): Object;
}

// EachSlice function interface
interface EachSliceFunction {
  (list: any[], iterator: Function, sliceSize: number): any[][];
}
