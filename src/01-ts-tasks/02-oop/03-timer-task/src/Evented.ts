import { MyObservable } from "./MyObservable";
import { MyObservableListener } from "./MyObservableListener";

interface EventsMap {
  [eventName: string]: MyObservableListener[];
}

export class Evented implements MyObservable {
  private eventsMap: EventsMap;

  constructor() {
    this.eventsMap = {};
  }

  on(eventName: string, listener: MyObservableListener) {
    if (!this.eventsMap[eventName]) {
      this.eventsMap[eventName] = [];
    }
    this.eventsMap[eventName].push(listener);
  }

  trigger(eventName: string, ...params: any[]) {
    const listeners: MyObservableListener[] = this.eventsMap[eventName] || [];
    listeners.forEach((listenerFn: MyObservableListener) => {
      listenerFn.apply(this, params);
    });
  }

  off(eventName: string) {
    this.eventsMap[eventName] = [];
  }
}
