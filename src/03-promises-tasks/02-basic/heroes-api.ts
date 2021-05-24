import axios from 'axios';

export default function heroesApi() {
  const url = 'static/json/heroes.json';
  const ajaxPromise = axios.get(url);
  ajaxPromise.then(function success(response) {
    console.log('fetchTvShowsfetchTvShows', response.data);
  }, function error(err) {
    console.error(err);
  });
}
