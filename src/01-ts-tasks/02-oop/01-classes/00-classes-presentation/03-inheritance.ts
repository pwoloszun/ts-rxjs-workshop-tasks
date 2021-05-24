enum Permission {Read, Write, Delete, Update}

class User {
  protected login: string;

  constructor(login: string) {
    this.login = login;
  }

  getLogin(): string {
    return this.login;
  }
}

class SuperUser extends User {
  protected password: string;

  constructor(login: string, password: string) {
    super(login);
    this.password = password;
  }

  getPassword(): string {
    return this.password;
  }
}

class Root extends SuperUser {
  private permissions: Permission[];

  constructor(login: string, permissions: Permission[], password: string) {
    super(login, password);
    this.permissions = permissions;
  }

  getLogin(): string {
    return "ROOT: " + super.getLogin();
  }

  getPermissions(): Permission[] {
    return this.permissions;
  }
}

export function inheritanceApp() {
  let login: string, passwd: string;

  // User class
  login = "ed";
  let user = new User(login);
  console.assert(user.getLogin() == login);

  // SuperUser class
  login = "ed";
  passwd = "#secret!";

  let su = new SuperUser(login, passwd);
  console.assert(su.getLogin() == login); // inherited from User
  console.assert(su.getPassword() == passwd);

  // Root class
  login = "the Boss";
  passwd = "imba haha!";
  let perms: Permission[] = [Permission.Read, Permission.Write, Permission.Update, Permission.Delete];
  let root = new Root(login, perms, passwd);

  console.assert(root.getLogin() == "ROOT: " + login);
  console.assert(root.getPassword() == passwd);
  console.assert(root.getPermissions() == perms);

  console.log("Inheritance test passed");
}