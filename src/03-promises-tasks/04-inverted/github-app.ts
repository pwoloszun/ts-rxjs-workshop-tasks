import githubApi from './github-api';

export default function githubApp() {
  const username = 'pwoloszun';
  const repoName = 'v-starterddd';

  githubApi.getRepos(username).then((repos) => {
    console.log('getRepos', repos.map(r => r.name));
  });
  githubApi.checkRepoAvailability(username, repoName).then((response) => {
    console.log('checkRepoAvailability', response);
  });
}
