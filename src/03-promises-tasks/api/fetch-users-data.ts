const USERS_DATA = [
  { id: 100, name: 'bob' },
  { id: 200, name: 'ed' },
  { id: 300, name: 'kate' },
];

export function fetchUsersData() {
  return new Promise(function (resolveFn, rejectFn) {
    setTimeout(() => {
      resolveFn(USERS_DATA);
    }, 1800);
  });
}
