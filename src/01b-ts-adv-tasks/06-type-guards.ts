interface Permission {
  id: number;
}

interface User {
  getPermissions(): Permission[];

  editProfile();
}

interface Admin {
  getPermissions(): Permission[];

  deleteUser(user: User);
}

type AppUser = User | Admin;

function isUser(appUser: AppUser): appUser is User {
  return (appUser as User).editProfile !== undefined;
}

function isAdmin(appUser: AppUser): appUser is Admin {
  return (appUser as Admin).getPermissions !== undefined;
}

function clientCode(appUser: AppUser) {
  if (isUser(appUser)) {
    appUser.editProfile();
  }
  else if (isAdmin(appUser)) {
    appUser.deleteUser({} as User);
  }
}
