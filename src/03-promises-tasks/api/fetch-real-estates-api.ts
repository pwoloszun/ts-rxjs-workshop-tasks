import axios from 'axios';
import { baseUrl } from './base-url';

import { delayValue } from './delay-value';

export function fetchRealEstates() {
  return axios.get(`${baseUrl}/real-estates`)
    .then((response) => {
      const realEstates = response.data
      // console.log('real estates data', realEstates);
      // return realEstates;
      return delayValue(realEstates, 1800);
    });
}
