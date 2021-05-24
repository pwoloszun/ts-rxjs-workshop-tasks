import axios from 'axios';

const API_KEY = '6a78596d062df78380eff5944c4e5567';
const URL = 'http://api.openweathermap.org/data/2.5/forecast';
const COUNTRY_CODE = 'pl';

const openWeatherApi = {
  weather(result) {
    const components = result.address_components;
    const cityComponent = components.filter((c) => {
      return c.types.includes('locality');
    })[0];
    const city = cityComponent.long_name; // .latinize();

    const params = {
      APPID: API_KEY,
      q: `${city},${COUNTRY_CODE}`,
      // q: 'Lublin' + ',' + COUNTRY_CODE,
    };
    return axios.get(URL, {params});
  },
};

export default openWeatherApi;
