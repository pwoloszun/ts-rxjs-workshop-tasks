interface AdminParams {
  login: string;
  password: string;
}

class Admin {
  private static NEXT_UUID = 0;
  private static ENCODING_STR: string = 'imba!';

  public uuid: number;
  private login: string;
  private password: string;
  private encodedPassword: string;

  constructor(params: AdminParams) {
    this.uuid = Admin.generateUuid();
    this.login = params.login;
    this.password = params.password;
    this.encodedPassword = this.encodePassword();
  }

  getLogin(): string {
    return this.login;
  }

  setLogin(login: string) {
    this.login = login;
  }

  getEncodedPassword(): string {
    return this.encodedPassword;
  }

  private static generateUuid() {
    return Admin.NEXT_UUID++;
  }

  private encodePassword() {
    return this.password + Admin.ENCODING_STR;
  }
}


/*
 * new Admin(params) class:
 * Public properties:
 * + uuid (generated using private static property NEXT_UUID)
 * Private properties:
 * - login
 * - password
 * Public methods:
 * + getLogin()
 * + setLogin(value)
 * + getEncodedPassword()
 * Private methods:
 * - encodePassword(passwd) (encoded using private static property ENCODING_STR)
 * Private static properties:
 * - NEXT_UUID
 * - ENCODING_STR
 * Private static methods:
 * - generateUuid() (generates next uniq UUID)
 * */
export function adminTaskApp() {
  let login: string = 'Bob';
  let passwd: string = '#secret!';

  let admin: Admin = new Admin({
    login: login,
    password: passwd
  });

  console.assert(admin.uuid == 0);
  console.assert(admin.getLogin() == login);
  login = 'kate';
  admin.setLogin(login);
  console.assert(admin.getLogin() == login);
  console.assert(admin.getEncodedPassword() == passwd + 'imba!');

  let otherAdmin: Admin = new Admin({
    login: 'ed',
    password: '#123456'
  });
  console.assert(otherAdmin.uuid == 1);
  console.assert(otherAdmin.getLogin() == 'ed');
  console.assert(otherAdmin.getEncodedPassword() == '#123456' + 'imba!');

  console.log("=== adminTest passed ===");
}
