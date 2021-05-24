// chrome://settings/content/location

const geoLocationApi = {
  locate() {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition((data) => {
        return resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  },
};

export default geoLocationApi;
