let old: number = -1;
let id: any;
function setServoAngle(angle: number) {
  /** 50hz 等于 20ms 一个周期 */
  const freq = 50;
  /** 高电平的取值范围是 0.5 ms 到 2.5 ms */
  // SG90舵机的控制信号通常在1ms到2ms之间，对应于0到180度
  var pulseWidth = map(angle, 0.5, 2.32, 4.4); // 映射角度到脉冲宽度
  var dutyCycle = pulseWidth / 20; // 将脉冲宽度转换为占空比（20ms周期）
  if (angle === old) return;
  if (id !== undefined) {
    clearTimeout(id);
  }
  analogWrite(NodeMCU.D2, dutyCycle, { freq });
  // 舵机0.3秒转动60度
  const speed = 300 / 60;
  let time = 180 * speed;
  if (old === -1) {
    time = Math.abs(angle - old) * speed;
  }
  old = angle;

  id = setTimeout(() => {
    analogWrite(NodeMCU.D2, 0);
  }, time);
}
// map函数用于将角度值映射到脉冲宽度，并考虑实际的校正值
function map(angle: number, minPulseWidth: number, midPulseWidth: number, maxPulseWidth: number) {
  // 计算角度对应的脉冲宽度
  if (angle <= 90) {
    // 低于或等于90度，使用0到90度的区间进行线性插值
    return (angle / 90) * (midPulseWidth - minPulseWidth) + minPulseWidth;
  } else {
    // 高于90度，使用90到180度的区间进行线性插值
    return ((angle - 90) / 90) * (maxPulseWidth - midPulseWidth) + midPulseWidth;
  }
}
setServoAngle(0);
import http = require("http");
http
  .createServer((req, res) => {
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", function () {
      if (req.url === "/angle") {
        setServoAngle(Number(body));
        sendRes(res, 200, `<h1>${body}</h1>`);
      } else {
        sendRes(res, 404, "<h1>404 Not Found</h1>");
      }
    });
  })
  .listen(80);
function sendRes(res: httpSRs, code: number, body: any) {
  res.writeHead(code, { "Content-Type": "text/html" });
  res.end(body);
}
