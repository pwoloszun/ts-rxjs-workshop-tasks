//TODO
function myFunction() {
  let name = 'Doda';
  const hasMarried = true;
  if (hasMarried) {
    let name = '<nazwisko pilkarza>';
    name = name.toUpperCase();
    console.log('inner block', name);
  }
  name = name.toUpperCase();
  console.log('outer block', name.toUpperCase());
}
