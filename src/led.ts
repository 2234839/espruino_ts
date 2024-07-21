let time = 0;
export function light(ms: number) {
  const now = Date.now();
  if (time < now) {
    time = now;
  }
  time += ms;
}

const D4Light = 0;

setInterval(() => {
  if (time > Date.now()) {
    // 板载 led 需要 D4 处于低电平才亮
    digitalWrite(NodeMCU.D4, D4Light);
    // 这个控制三极管，拉低电平才导通。 0 为开启
    analogWrite(NodeMCU.D7, 0, {});
  } else {
    digitalWrite(NodeMCU.D4, !D4Light);
    digitalWrite(NodeMCU.D7, 1);
  }
}, 100);
