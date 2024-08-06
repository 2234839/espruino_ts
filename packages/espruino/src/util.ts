const _log = console.log;
export let logInfo = "";

export const log = (...args: any[]) => {
  _log(...args);
  logInfo += `${Date.now().toFixed(2)}:` + args.join(" ") + "\n";
};
console.log = log;
