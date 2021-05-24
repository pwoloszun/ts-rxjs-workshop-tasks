import MyPromise from './my-promise';

export default function myPromiseApp() {
  const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
      // reject(123);
    }, 1500);
  });

  p.then((data) => {
    console.log('MyPromise SUCC', data);
  }, (error) => {
    console.log('MyPromise error', error);
  });

  setTimeout(() => {
    p.then((data) => {
      console.log('other SUCC', data);
    }, (error) => {
      console.log('other error', error);
    });
  }, 3000);
}
