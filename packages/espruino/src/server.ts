import http = require("http");
import ESP8266 = require("ESP8266");
import { light } from "./led";
import { count } from "./store";
import { log, logInfo } from "./util";
export const server = http.createServer((req, res) => {
  light(200);
  log("[req]", req.url);
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", function () {
    if (req.url === "/") {
      sendRes(
        res,
        200,
        `<h1>Welcome to my simple website!</h1>\
  <a href="/about">about</a>\
   | <a href="/reboot">reboot</a>\
   | reboot count ${count}\
  <pre>${logInfo}</pre>
  `,
      );
    } else if (req.url === "/about") {
      sendRes(res, 200, "<h1>admin@shenzilong.cn</h1>");
    } else if (req.url === "/reboot") {
      ESP8266.reboot();
    } else if (req.url === "/setCode") {
      sendRes(res, 200, `<h1>setCode</h1>\n${body}`);
      setTimeout(() => {
        E.setBootCode(body);
        E.reboot();
      }, 1_000);
    } else {
      sendRes(res, 404, "<h1>404 Not Found</h1>");
    }
  });
});
function sendRes(res: httpSRs, code: number, body: any) {
  res.writeHead(code, { "Content-Type": "text/html" });
  res.end(body);
}
