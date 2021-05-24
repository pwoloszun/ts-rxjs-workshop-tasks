// TODO: map
function map(list: any[], mapper: Function): any[] {
  let mappedList: any[] = [];
  for (let i: number = 0; i < list.length; i++) {
    let el: any = list[i];
    mappedList.push(mapper(el, i));
  }
  return mappedList;
}

function testMap() {
  let names: string[] = ["Bob", "Ed", "Kate"];
  let mapper: Function = function (name: string) {
    return "Hello, " + name;
  };
  let greetings: string[] = map(names, mapper);
  console.log("map:", greetings);
}

// TODO: filter
function filter(list: any[], filteringAlgorithm: Function): any[] {
  let filteredList: any[] = [];
  for (let i: number = 0; i < list.length; i++) {
    let el: any = list[i];
    if (filteringAlgorithm(el, i)) {
      filteredList.push(el);
    }
  }
  return filteredList;
}

function testFilter() {
  let names: string[] = ["Bob", "Ed", "Brian", "Ben", "Kate"];
  let startingWithB: Function = function (name) {
    return name[0].toUpperCase() === "B";
  };
  let namesStartingWithB: string[] = filter(names, startingWithB);
  console.log("filter:", namesStartingWithB);
}

// TODO: reduce
function reduce(list: any[], iterator: Function): any {
  if (list.length === 0)
    return null;
  let result: any = list[0];
  for (let i: number = 1; i < list.length; i++) {
    result = iterator(result, list[i], i, list);
  }
  return result;
}

function testReduce() {
  let sumFn: Function = function (memo: any, item: any, index: number, list: any[]): any {
    return memo + item;
  };
  // should return => 14
  console.log("reduce 1:", reduce([2, 5, 7], sumFn));

  let mergeFn = function (memo: any, item: any, index: number, list: any[]): any {
    return merge(memo, item);
  };
  // should return => {name: "bob", age: 12, sex: "M"}
  console.log("reduce 2:", reduce([{name: "bob"}, {age: 12}, {sex: "M"}], mergeFn));
}

// TODO: merge
function merge(destination: Object, source: Object): Object {
  for (let propertyName in source) {
    destination[propertyName] = source[propertyName];
  }
  return destination;
}

function testMerge() {
  // should return => {xxx: "qq", yyy: 2, zzz: 3}
  console.log("merge:", merge({xxx: 1, yyy: 2}, {xxx: "qq", zzz: 3}));
}

// TODO: all
function all(list: any[], test: Function): boolean {
  let item: any;
  for (let i: number = 0; i < list.length; i++) {
    item = list[i];
    if (!test(item, i)) {
      return false
    }
  }
  return true;
}

function testAll() {
// should return => false
  let greaterThanZero: Function = function (item: any, index: number): boolean {
    return item > 0;
  };
  console.log("all 1:", all([3, 5, -1, 9], greaterThanZero));

// should return => true
  let firstLetterIsB: Function = function (item: any, index: number): boolean {
    return item[0] === "B";
  };
  console.log("all 2:", all(["Bob", "Ben", "Beth"], firstLetterIsB));
}

// TODO: pluck
function pluck(list: Object[], propertyName: string): any[] {
  let results: any[] = [];
  let item: Object;
  for (let i: number = 0; i < list.length; i++) {
    item = list[i];
    results.push(item[propertyName]);
  }
  return results;
}

function testPluck() {
  let people: Object[] = [
    {name: "Bob", age: 12, sex: "M"},
    {name: "Kate", age: 22, sex: "F"},
    {name: "Ed", age: 34, sex: "M"}
  ];
  // should return => ["Bob", "Kate", "Ed"]
  console.log("pluck 1:", pluck(people, "name"));

  // should return => ["M", "F", "M"]
  console.log("pluck 2:", pluck(people, "sex"));
}

// TODO: groupBy
function groupBy(list: any[], iterator: Function): Object {
  let grouped: Object = {};
  let item, value: any;

  for (let i: number = 0; i < list.length; i++) {
    item = list[i];
    value = iterator(item);
    if (!grouped[value]) {
      grouped[value] = [];
    }
    grouped[value].push(item);
  }

  return grouped;
}

function testGroupBy() {
  let names: string[] = ["Bob", "Ed", "Kate", "Bo", "Ann", "Eve"];

  // should return => {2: ["Ed", "Bo"], 3: ["Bob", "Ann", "Eve"], 4: ["Kate"]}
  let byLength: Function = function (item: any): number {
    return item.length;
  };
  console.log("groupBy 1:", groupBy(names, byLength));

  // should return => {A: ["Ann"], B: ["Bob", "Bo"], E: ["Ed", "Eve"], K: ["Kate"]}
  let byFirstLetter: Function = function (item: any): string {
    return item[0];
  };
  console.log("groupBy 2:", groupBy(names, byFirstLetter));
}

export function functionsApp() {
  testAll();
  testFilter();
  testGroupBy();
  testMap();
  testMerge();
  testPluck();
  testReduce();
}
