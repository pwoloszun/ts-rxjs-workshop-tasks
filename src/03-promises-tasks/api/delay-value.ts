export function delayValue(value: any, delayInMs: number) {
  return new Promise(function (resolveFn, rejectFn) {
    setTimeout(() => {
      resolveFn(value);
    }, delayInMs);
  });
}
