export const createObserver = () => {
  const listeners = new Set();
  const subscribe = (fn) => listeners.add(fn);
  console.log("어떻게 구독?", subscribe);
  const notify = () => listeners.forEach((listener) => listener());

  return { subscribe, notify };
};
