let time = 0
export function light(ms: number) {
    const now = Date.now()
    if (time < now) {
        time = now
    }
    time += ms
}

setInterval(() => {
    // 板载 led 需要 D4 处于低电平才亮
    digitalWrite(NodeMCU.D4, !(time > Date.now()));
}, 100)