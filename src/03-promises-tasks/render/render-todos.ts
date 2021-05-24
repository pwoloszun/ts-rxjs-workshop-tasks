import * as $ from 'jquery';

export function renderTodos(containerSelector, todos) {
  const htmlItems = todos.map((todo) => {
    return `<li>
      <h5>${todo.title}</h5>
      <small>${todo.description}</small>
    </li>`;
  });
  const htmlContent = htmlItems.join('');
  $(containerSelector).append(htmlContent);
}
