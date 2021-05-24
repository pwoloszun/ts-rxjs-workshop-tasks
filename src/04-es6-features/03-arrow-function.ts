const names = ['bob', 'ed', 'fred', 'dylan', 'ben'];

export default function arrowFunctionApp() {
  console.log('upper cased', names.map(n => n.toUpperCase()));
  console.log('upper cased 2', names.map((n) => {
    return n.toUpperCase();
  }));
  // TODO
  // console.log('greetings'); // map to greetings
  // filter all starting with 'B'
  // find longest
  // check if any starts with 'A'
}
