import { fetchUsersData } from '../api/fetch-users-data';
import { fetchRealEstates } from '../api/fetch-real-estates-api';
import { renderRealEstates } from '../render/render-real-estates';
import { fetchTodos } from '../api/fetch-todos-api';
import { renderTodos } from '../render/render-todos';

function fetchUsersTask() {
  fetchUsersData()
    .then((users) => {
      console.log('users data', users);
    });
}

function loadRealEstatesTask() {
  fetchRealEstates()
    .then((realEstates) => {
      renderRealEstates(realEstates);
    });
}

function loadTodosTask() {
  fetchTodos()
    .then((todos) => {
      console.log('loaded todos', todos);
      renderTodos('#todos-list', todos);
    });
}

export function basicsTasksApp() {
  // fetchUsersTask();
  // loadRealEstatesTask();
  // loadTodosTask();
}
