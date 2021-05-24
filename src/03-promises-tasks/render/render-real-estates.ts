import * as $ from 'jquery';

export function renderRealEstates(items) {
  const htmlItems = items.map((item) => {
    return `<li>${item.street}</li>`;
  });
  const htmlContent = htmlItems.join('');
  $('#real-estates-list').append(htmlContent);
}
