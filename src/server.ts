import http = require("http");
import ESP8266 = require("ESP8266");
import { light } from "./led";
import { count } from "./store";
import { log, logs } from "./util";
export const server = http.createServer((req, res) => {
  light(1000);
  log("[req]", req.url);
  if (req.url === "/") {
    sendRes(
      res,
      200,
      `<h1>Welcome to my simple website!</h1>\
<a href="/about">about</a>\
 | <a href="/reboot">reboot</a>\
 | reboot count ${count}\
<pre>${JSON.stringify(logs, null, 2)}</pre>
`,
    );
  } else if (req.url === "/about") {
    sendRes(res, 200, "<h1>admin@shenzilong.cn</h1>");
  } else if (req.url === "/reboot") {
    ESP8266.reboot();
  } else if (req.url === "/eval") {
    const data = req.read(0);
    const r = (0, eval)(data);
    sendRes(res, 200, `<h1>eval value</h1>\n${r}`);
  } else if (req.url === "/setCode") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", function () {
      log("[end] ");
      sendRes(res, 200, `<h1>setCode</h1>\n${body}`);
      setTimeout(() => {
        E.setBootCode(body);
        E.reboot();
      }, 1_000);
    });
    // sendRes(res, 200, `<h1>setCode</h1>\n${''}\n${data}`);
  } else {
    sendRes(res, 404, "<h1>404 Not Found</h1>");
  }
});
function sendRes(res: httpSRs, code: number, body: any) {
  res.writeHead(code, { "Content-Type": "text/html" });
  res.end(body);
}
