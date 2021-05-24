import axios from 'axios';

const URL = 'https://maps.googleapis.com/maps/api/geocode/json';

const requestWithParams = (params) => {
  return axios.get(URL, {params});
};

const gmapsApi = {
  detailsByCoords(coords) {
    return requestWithParams({
      latlng: `${coords.latitude},${coords.longitude}`,
    });
  },
  detailsByAddress(address) {
    return requestWithParams({
      address,
    });
  },
};

export default gmapsApi;
