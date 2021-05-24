// ======
// interface inheritance
interface Shape {
  width: number;
  height: number;
}

interface Color {
  mainColor: string;
  backgroundColor: string;
}

interface Square extends Shape, Color {
  hasBorder: boolean;
}

let square = <Square>{};
square.mainColor = 'blue';
square.width = 10;
square.height = 5.0;
