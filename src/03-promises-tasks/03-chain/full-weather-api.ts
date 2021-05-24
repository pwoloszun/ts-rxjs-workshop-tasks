import geoLocator from './geo-locator-api';
import gmaps from './gmaps-api';
import openWeatherApi from './open-weather-api';

const fullWeatherApi = {
  getWeatherByGeoLocation() {
    const fullData: any = {};
    const promise = geoLocator.locate().then((geo: any) => {
      fullData.coords = geo.coords;
      return gmaps.detailsByCoords(geo.coords);
    }).then((response) => {
      const result = response.data.results[0];
      fullData.gmaps = result;
      return openWeatherApi.weather(result);
    }).then((response) => {
      fullData.openWeather = response.data;
      return fullData;
    });
    return promise;
  },
};

export default fullWeatherApi;
