import { Observer } from 'rxjs';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { interval } from 'rxjs';
import { map, scan, take, tap } from 'rxjs/operators';

export function items$(items: any[], delayInMs: number): Observable<any> {
  return interval(delayInMs).pipe(
    take(items.length),
    map((i) => items[i])
  );
}

export function stream$(name, delayInMs: number, limit: number = null, logType: string = 'none') {
  let s = timer(0, delayInMs).pipe(
    map((v) => v + `-${name}`)
  );
  if (limit !== null) {
    s = s.pipe(
      take(limit)
    );
  }

  if (logType.toLowerCase() === 'full') {
    s = s.pipe(tap(fullObserver(name)));
  } else if (logType.toLowerCase() === 'partial') {
    s = s.pipe(tap(partialObserver(name)));
  } else if (logType !== 'none') {
    throw new Error(`Unknown 'log' value: ${logType}`);
  }

  return s;
}

const successColor = '#007700';
const errorColor = '#FF3300';
const completeColor = successColor;

export function fullObserver(tag: string): Observer<any> {
  return {
    next(value) {
      const message = tag.length < 5 ? `[${tag}]:\t\t` : `[${tag}]:\t`;
      console.log(`%c${message}`, `color: ${successColor}; font-weight: bold;`, value);
    },
    error(error) {
      const message = tag.length < 5 ? `[${tag}]:\t\t ERROR` : `[${tag}]:\t ERROR`;
      console.log(`%c${message}`, `color: ${errorColor}; font-weight: bold;`, error.stack || error);
    },
    complete() {
      const message = tag.length < 5 ? `[${tag}]:\t\t COMPLETE` : `[${tag}]:\t COMPLETE`;
      console.log(`%c${message}`, `color: #ffffff; background-color: ${completeColor}`);
    }
  };
}

export function partialObserver(stream) {
  return {
    error() {
      const message = stream.length < 5 ? `[${stream}]:\t\tERROR` : `[${stream}]:\tERROR`;
      console.log(message);
    },
    complete() {
      const message = stream.length < 5 ? `[${stream}]:\t\tCOMPLETE` : `[${stream}]:\tCOMPLETE`;
      console.log(message);
    }
  };
}

export function randomBetween(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

export function throwOnItem(count, stream) {
  return (source) => source.pipe(
    scan((acc, value) => [value, ...acc], []),
    map((values: Number[]) => {
      if (values.length === count) {
        throw new Error(`Error on the stream '${stream}'!`);
      }
      return values[0];
    }),
    tap(partialObserver(stream))
  );
}
