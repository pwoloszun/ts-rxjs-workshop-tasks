const runnerFactory = {
  create(name, length) {
    return new Promise((resolve) => {
      let distance = 0;
      let time = 0;
      const delay = 20;
      const intervalId = setInterval(() => {
        distance += Math.random() * 10;
        time += delay;
        if (time % 1000 === 0) {
          console.log(`name ${name}:`, distance);
        }
        if (distance >= length) {
          clearInterval(intervalId);
          resolve({name, time, distance});
        }
      }, delay);
    });
  },
};

export default runnerFactory;
