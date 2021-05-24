import { MyObservableListener } from "./MyObservableListener";

export interface MyObservable {
  on(eventName: string, listener: MyObservableListener);

  trigger(eventName: string, ...params: any[]);

  off(eventName: string);
}
