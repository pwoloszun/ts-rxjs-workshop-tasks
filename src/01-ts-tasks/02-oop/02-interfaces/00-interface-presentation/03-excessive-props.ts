// ======
interface User {
  login: string;
  readonly password?: string;
}

export function excessiveProps() {
  // class instance
  let ed: User = {
    login: 'admin',
    // xxx: 123,
  }

}
