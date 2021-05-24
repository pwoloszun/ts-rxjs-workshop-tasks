import runnerFactory from './runner-factory';
import promiseRace from './promise-race';

export default function raceApp() {
  const distance = 1500;
  const runnerNames = ['Zolw', 'Zajac', 'Wilk', 'Prosiaczek'];

  const runners = runnerNames.map((name) => {
    return runnerFactory.create(name, distance);
  });

  promiseRace(runners).then((winnerData) => {
    console.log('winner', winnerData);
  });

  Promise.all(runners).then((finalResults) => {
    console.log('finalResults', finalResults);
  });
}
