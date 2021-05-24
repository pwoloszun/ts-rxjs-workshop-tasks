import { Timer, TimerParams } from "./src/Timer";

export function timerApp() {
  const params: TimerParams = {
    duration: 20, // in sec, default: Infinity
    step: 2 // in sec, default: 1
  };
  const timer = new Timer(params);

  // on(eventName, listener) - assigns listener to given eventName ("start", "pause", "tick", "end")
  // triggered when timer is started
  timer.on("start", function (currentStep: number) {
    console.log("started at: " + currentStep);
  });

  // triggered when timer finishes or has been stoped
  timer.on("stop", function (currentStep: number) {
    // this === timer
    console.log("stopped at: " + currentStep);
  });

  // triggered when timer is paused
  timer.on("pause", function (currentStep: number) {
    console.log("paused at: " + currentStep);
  });

  // triggers every step seconds
  timer.on("tick", function (currentStep: number) {
    console.log("tick at: " + currentStep);
  });

  timer.start(); // start() - starts timer

  setTimeout(function () {
    timer.pause(); // pause() - pauses counter
  }, 5000);

  setTimeout(function () {
    timer.start(); // resume paused timer
  }, 6000);

  setTimeout(function () {
    timer.stop(); // stop() - stops timer
  }, 16000);

  setTimeout(function () {
    timer.start(); // stop() - stops timer
  }, 18000);
}
