export const logs: any[] = [];
const _log = console.log;
export const log = (...args: any[]) => {
  _log(...args);
  logs.push(args);
  if (logs.length > 20) {
    logs.shift();
  }
};
console.log = log;
