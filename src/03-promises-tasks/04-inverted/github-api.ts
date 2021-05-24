import axios from 'axios';

const AVAILABLE = 'Available';
const NOT_AVAILABLE = 'Not available';

const githubApi = {
  checkRepoAvailability(username, repoName) {
    const url = `https://api.github.com/repos/${username}/${repoName}`;
    return axios.get(url).then(() => {
      return NOT_AVAILABLE;
    }).catch((error) => {
      const {status} = error.response;
      if (status === 404) {
        return AVAILABLE as never;
      }
      return Promise.reject(status);
    });
  },
  getRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    return axios.get(url).then((response) => {
      return response.data;
    });
  },
  getRepoNames(username) {
    return this.getRepos(username).then((data) => {
      return data.map((item) => {
        return item.name;
      });
    });
  },
};

export default githubApi;
