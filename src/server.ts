import http = require("http");
import ESP8266 = require("ESP8266");
import { light } from "./led";
import { count } from "./store";
export const server = http.createServer((req, res) => {
  light(1000);
  console.log("[req]", req.url);
  if (req.url === "/") {
    sendRes(
      res,
      200,
      `<h1>Welcome to my simple website!</h1>\
<a href="/about">about</a>\
 | <a href="/reboot">reboot</a>\
 | reboot count ${count}\
`,
    );
  } else if (req.url === "/about") {
    sendRes(res, 200, "<h1>admin@shenzilong.cn</h1>");
  } else if (req.url === "/reboot") {
    ESP8266.reboot();
  } else if (req.url === "/eval") {
    let data = req.available();

    sendRes(res, 200, `<h1>ok ${data}</h1>`);
  } else {
    sendRes(res, 404, "<h1>404 Not Found</h1>");
  }
});
function sendRes(res: httpSRs, code: number, body: any) {
  res.writeHead(code, { "Content-Type": "text/html" });
  res.end(body);
}
