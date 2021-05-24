import { fetchUsersData } from '../api/fetch-users-data';
import { fetchTodos } from '../api/fetch-todos-api';
import { fetchRealEstates } from '../api/fetch-real-estates-api';
import { delayValue } from '../api/delay-value';

async function fetchSomeData() {
  const users = await fetchUsersData();
  console.log('users data', users);

  await delayValue(null, 800);
  const todos = await fetchTodos();
  console.log('todos data', todos);

  await delayValue(null, 2400);
  const realestates = await fetchRealEstates();
  console.log('real estates data', realestates);
}

export function asyncAwaitExamplesApp() {
  // fetchSomeData();
}
