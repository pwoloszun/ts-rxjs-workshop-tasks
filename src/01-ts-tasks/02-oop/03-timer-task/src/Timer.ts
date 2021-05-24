import { Evented } from "./Evented";

export enum TimerEvents {
  START = 'start',
  STOP = 'stop',
  PAUSE = 'pause',
  TICK = 'tick',
}

export interface TimerParams {
  duration: number;
  step: number;
}

export class Timer extends Evented {
  private static MS_IN_SEC = 1000;

  private intervalId = null;
  private isRunning: boolean = false;
  private currentStep: number = 0;
  private step: number;
  private duration: number;

  constructor(params: TimerParams) {
    super();
    this.step = params.step;
    this.duration = params.duration;
  }

  start() {
    if (this.isRunning)
      return;
    this.intervalId = setInterval(() => {
      if (this.currentStep >= this.duration) {
        this.stop();
      } else {
        this.runNextStep();
      }
    }, this.step * Timer.MS_IN_SEC);
    this.isRunning = true;
    this.triggerTimerEvent("start");
  }

  stop() {
    this.stopRunning();
    this.triggerTimerEvent("stop");
    this.currentStep = 0;
  }

  pause() {
    this.stopRunning();
    this.triggerTimerEvent("pause");
  }

  private runNextStep() {
    this.currentStep += this.step;
    this.triggerTimerEvent("tick");
  }

  private stopRunning() {
    clearInterval(this.intervalId);
    this.isRunning = false;
  }

  private triggerTimerEvent(eventName: string) {
    this.trigger(eventName, this.currentStep);
  }
}
