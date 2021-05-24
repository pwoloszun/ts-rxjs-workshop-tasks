import fullWeatherApi from './full-weather-api';

function weatherApp() {
  fullWeatherApi.getWeatherByGeoLocation().then((data) => {
    console.log('weather DATA', data);
  }).catch((error) => {
    console.log('weather error', error);
  });
}

export default weatherApp;
