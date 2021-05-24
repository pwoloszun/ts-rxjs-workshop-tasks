// default param value
function defaultParamValueExample(age: number, name = '<UNKNOWN>', sex: string) {
  console.log('defaultParamValueExample', age, name, sex);
}

// rest param
function restParamsExample(...params: any[]) {
  console.log('restParamsExample', params);
}

// spread operator
function spreadOperatorExample() {
  const names = ['Bob', 'Ed', 'Joe'];
  const copy = [...names];
  console.log('array copy', names, copy, names === copy);

  const personData = {
    name: 'Bob',
    age: 12,
  };
  const copyData = {
    ...personData,
  };
  console.log('object copy', personData, copyData, personData === copyData);
}

export default function extendedParamHandling() {
  defaultParamValueExample(12, 'Bob', 'M');
  defaultParamValueExample(45, undefined, 'F');
  // defaultParamValueExample(33);

  restParamsExample('Bob', 'Ed', 'Joe');
  restParamsExample('Bob', [997, 123], { activated: true });

  spreadOperatorExample();
}
