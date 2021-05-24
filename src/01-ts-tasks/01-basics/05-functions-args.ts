//rest operator
function setFullName(lastName: string, ...otherNames: string[]) {
  console.log("setFullName args:", lastName, otherNames);
}

function testSetFullName() {
  setFullName("Smith");
  setFullName("Smith", "Bob", "Edward", "II");
}


//default arg values
function sendData(url: string, name: string = "MY_DEFAULT_NAME", age: number = -1) {
  console.log("sendData args:", url, name, age);
}

function testSendData() {
  setFullName("Smith");
  setFullName("Smith", "Bob", "Edward", "II");
}

export function functionsArgsApp() {
  sendData("http://batman.com");
  sendData("http://bob.com", "Bobek!", 33);
  sendData("http://batman.com", undefined, 55);
}