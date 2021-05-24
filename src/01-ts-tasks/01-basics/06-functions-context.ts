function setPersonalData(name: string, age: number) {
  console.log("setPersonalData", this, name, age);
}

function testSetPersonalData() {
  let bob = {name: "Bobek!"};

  setPersonalData("Bob II", 12);
  setPersonalData.call(bob, "Bob II", 12);
  setPersonalData.apply(bob, ["Bob II", 12]);
}


/*
 * Calls given function fn in context of object contextObj, with every
 * other parameter passed to function
 * Usage:
 * callInContext(myFunction, myObject, 1, "xxx", [])
 * */
function callInContext(fn: Function, contextObj: any, ...args: any[]) {
  return fn.apply(contextObj, args);
}

function testCallInContext() {
  let myFunction: Function = function (...params: any[]) {
    // this === bob
    console.log("myFunction context == ", this);
    console.log("myFunction args == ", params);
    return 123;
  };

  let bob = {
    name: "Bob"
  };

  let result = callInContext(myFunction, bob, "www", 997, [], null);
  console.log("myFunction result == ", result);
}

export function functionsContextApp() {
  testSetPersonalData();
  testCallInContext();
}