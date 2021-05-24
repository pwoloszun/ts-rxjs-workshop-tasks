const promiseRace = (concurentPromises) => {
  return new Promise((resolve, reject) => {
    concurentPromises.forEach((p) => {
      p.then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  });
};

export default promiseRace;
