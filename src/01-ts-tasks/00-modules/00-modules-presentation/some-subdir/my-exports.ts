// ======
// export declaration
export const xxx = 123;

export function myFn() {
  console.log('a qq!');
}

export class MyCustomClass {
}

// ======
// export statements
let yyy = true;

function ggg() {
  return 997;
}

export {
  yyy,
  ggg,
};

// ======
// default export
const mainModuleDefinition = 3.14;

export default mainModuleDefinition;
