export const logs: any[] = [];
export const log = (...args: any[]) => {
  console.log(...args);
  logs.push(args);
  if (logs.length > 20) {
    logs.shift();
  }
};
