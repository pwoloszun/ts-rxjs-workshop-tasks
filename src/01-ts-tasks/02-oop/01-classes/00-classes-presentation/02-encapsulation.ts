class Robot {
  private static DEFAULT_NAME:string = "[no name]";

  serialNo:string;
  private _createdAt:Date;

  constructor(private _name:string, serialNo:number) {
    this.serialNo = Robot.generateNumberFor(serialNo);
    this._createdAt = this.now();
  }

  getName():string {
    return this._name;
  }

  getCreatedAt():Date {
    return this._createdAt;
  }

  private static generateNumberFor(serialNo:number):string {
    return "ABX-" + serialNo;
  }

  private now():Date {
    return new Date();
  }
}
