import $ from 'jquery';

import { template } from './template.html';

export function renderApp() {
  $('#app').html(template);
}
