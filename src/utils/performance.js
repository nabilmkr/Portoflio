/**
 * rafThrottle - Throttle using requestAnimationFrame for smooth UI updates
 * Best for pointer move and other high-frequency events
 */
export function rafThrottle(func) {
  let isRunning = false;
  let lastArgs = null;
  let lastThis = null;

  return function throttled(...args) {
    lastArgs = args;
    lastThis = this;

    if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(() => {
        func.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
        isRunning = false;
      });
    }
  };
}
