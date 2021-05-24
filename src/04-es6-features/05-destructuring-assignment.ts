// array matching
function arrayMatchingExample() {
  const names = ['Bob', 'Ed', 'Joe'];
  const [firstPerson, secondPerson, third] = names;

  console.log('arrayMatchingExample', firstPerson, third);
}

// object matching
function objectMatchingExample() {
  const bob = {
    name: 'Bob',
    age: 12,
    sex: 'M',
    siblings: ['Anna', 'Martha'],
  };
  const {name, sex} = bob;

  console.log('objectMatchingExample', name, sex);
}

// deep matching
function deepMatchingExample() {
  const bob = {
    name: 'Bob II',
    age: 12,
    sex: 'M',
    father: {
      name: 'Bob Jr',
      mother: {
        maidenName: 'Doe',
      },
    },
  };

  const {father: {name, mother: {maidenName}}, age} = bob;
  console.log('deepMatchingExample', name, age, maidenName);
}

// matching with default values
function matchingWithDefaultValuesApp() {
  console.log('matchingWithDefaultValuesApp');
}

// destructuring params
function destructuringParamsApp() {
  function paramsToArray({a, b, c: ccc}) {
    return [a, b, ccc];
  }

  console.log('paramsToArray', paramsToArray({a: 'Anna', b: undefined, c: 'Cecylia'}));

  function createBirthdayWishes({firstName, lastName, age, from}) {
    return `\n\nSurprise ${firstName} ${lastName}!\nAll the best on your ${age} birthday from:\n\n${from.join(',\n')}`;
  }

  const bobBirthdayData = {
    firstName: 'Bob',
    lastName: 'Smith',
    age: 34,
    from: ['Cecylia', 'Anna', 'Ed'],
  };
  console.log('createBirthdayWishes', createBirthdayWishes(bobBirthdayData));
}

export default function destructuringAssignmentApp() {
  arrayMatchingExample();
  objectMatchingExample();
  deepMatchingExample();
  destructuringParamsApp();
}
