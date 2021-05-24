// ======
// dictionary interfaces
interface NamesDictionary {
  [key: string]: string;
}

interface Person2 {
  name: string;
  height: number;
  weight: number;
}

// PeopleDictionary each entry is Person array, keys: firstLetter
interface PeopleDictionary {
  [firstLetter: string]: Person2[];
}

// DepartmentsDictionary each entry implements PeopleDictionary, keys: departmentName
interface DepartmentsDictionary {
  [departmentName: string]: PeopleDictionary;
}

// OrganizationsDictionary each entry implements DepartmentsDictionary, keys: organizationShortcut
interface OrganizationsDictionary {
  [organizationShortcut: string]: DepartmentsDictionary;
}
