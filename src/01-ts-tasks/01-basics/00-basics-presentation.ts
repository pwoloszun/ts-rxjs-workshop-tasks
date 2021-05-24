// ======
// basic types
let isValid: boolean = false;
let height: number = 123;
let lastName: string = 'Smith';

// ======
// arrays
let names: string[] = ['bob', 'ed', 'kate'];
let lottoNumbers: number[] = [7, 49, 31, 2, 17, 28];

// ======
// tuples
let controlParams: [string, number] = ['Enter password', 123456];
controlParams[0].toUpperCase();
controlParams[1].toFixed();

// tuples c.d. - elements outside known indices
// controlParams[99] = 1.099; // union type: string | number

// ======
// enum
enum WeekDay {SUNDAY = 0, MONDAY = 1, TUESDAY = 2, WEDNESDAY = 3, THURSDAY = 4, FRIDAY = 5, SATURDAY = 6}

enum Sex {NOT_KNOWN = 0, MALE = 1, FEMALE = 2, NOT_APPLICABLE = 9}

// ======
// any
let xxx: any;
xxx = 123;
xxx = 'qq';
xxx = {};

// ======
// void
function logData(data: any): void {
  console.log(data);
}

// ======
// never - Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message);
  // unreachable end point
}

function myLoop(): never {
  while (true) {
  }
  // unreachable end point
}

// ======
// type assertion
function getSomeValue(): any {
  return 'a qq!';
}

let someValue = getSomeValue();
let strLength: number = (<string>someValue).length; // angel-bracket
let strLength2: number = (someValue as string).length;

// ======
// object type - represents all non-primitive types
// Object type - DON'T USE IT: it describes functionality that is common to all JavaScript objects
const myData: object = {
  xxx: 123,
  yyy: 'qq'
};
