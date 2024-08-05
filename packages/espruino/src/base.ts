import wifi = require("Wifi");
import { s_connect, s_connected, s_count } from "./const";
import { server } from "./server";
import { count, wifiConfig } from "./store";
import { log } from "./util";
import ESP8266 = require("ESP8266");
import { light } from "./led";

// set wifi
// require("Storage").writeJSON("wifi", { ssid: "your ssid", pwd: "your password" });

// 基座代码

light(3000);

log(`boot ${s_count}:${count}`, require("Storage").read(".bootcde")?.slice(0, 30));
const onConnect = (info: { ip: string }) => {
  log(s_connected, info.ip, new Date().toISOString());
  server.listen(3000);
  // http.get("http://worldtimeapi.org/api/timezone/Asia/Shanghai", (r) => {
  //   let d = "";
  //   r.on("data", (c:any) => (d += c));
  //   r.on("end", () => log("Beijing time", JSON.parse(d).datetime));
  // });
  require("app.js");
};

wifi.getDetails((details) => {
  const status = details.status;
  if (!status.startsWith(s_connect)) {
    wifi.connect(wifiConfig.ssid, { password: wifiConfig.pwd }, (_) => log("[wifi]", s_connect));
  }
  if (status === s_connected) {
    wifi.getIP((_, info) => onConnect(info));
  } else {
    wifi.on(s_connected, onConnect);
  }
});
wifi.stopAP(() => {});

// wifi network watch
// require("Wifi").getDetails(console.log)
setInterval(() => {
  wifi.getDetails((details) => {
    if (details.status !== s_connected) {
      log(`not wifi ${s_connected} reboot`);
      ESP8266.reboot();
    }
  });
}, 30 * 1000);
