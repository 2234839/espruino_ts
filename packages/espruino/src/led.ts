let lightId = -1;
const D4Light = false;
export function light(ms: number, pin = NodeMCU.D4) {
  clearInterval(lightId);
  digitalWrite(pin, D4Light);
  setTimeout(() => digitalWrite(pin, !D4Light), ms);
}
