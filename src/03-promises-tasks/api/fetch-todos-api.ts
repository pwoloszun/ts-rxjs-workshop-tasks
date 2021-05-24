import axios from 'axios';
import { baseUrl } from './base-url';
import { delayValue } from './delay-value';

export function fetchTodos() {
  return axios.get(`${baseUrl}/todos`)
    .then((response) => {
      return delayValue(response.data, 1800);
    });
}
