// prop shorthand
function propShorthandExample() {
  const name = 'Bob';
  const children = 3;
  const dob = '1976-03-12';

  const bob = {
    name,
    children,
    dob,
  };
  console.log('propShorthandExample', bob);
}

function generatePropNameFor(label, propName) {
  return `${label}--${propName}`;
}

// computed prop name
function computedPropNameExample() {
  const lastNamePropName = 'ed-last-name';
  const sexPropName = generatePropNameFor('ed', 'sex');

  const data = {
    name: 'Ed',
    [lastNamePropName]: 'Smith',
    [sexPropName]: 'M',
  };

  console.log('propShorthandExample', 123);
}

// method props
function methodPropsExample() {
  const myApi = {
    getById(id) {
      return {data: 'some data'};
    },

    getAll() {
      return [];
    },
  };

  myApi.getAll();
  myApi.getById(100);

  console.log('propShorthandExample', 123);
}

export default function enhancedObjectProps() {
  propShorthandExample();
  computedPropNameExample();
  methodPropsExample();
}
