function setServoAngle(angle: number) {
  // 将角度映射到脉冲宽度范围（1ms 到 2ms）
  // 设置 PWM 输出，占空比表示脉冲宽度
  analogWrite(NodeMCU.D2, 0.1 + (angle / 180) * 0.15, { freq: 50 });
}
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
