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

light(100);

log(`boot ${s_count}:${count}`, require("Storage").read(".bootcde")?.slice(0, 30));
server.listen(3000);
try {
  require("app.js");
} catch (error) {
  console.log(error);
}
const onConnect = (info: { ip: string }) => {
  light(100);
  log(s_connected, info.ip, new Date().toISOString());
};

// TODO 这个检测不太可靠,有时候连接上了它状态还是未链接
wifi.getDetails((details: any) => {
  const status = details.status;
  if (!status.startsWith(s_connect)) {
    wifi.connect(wifiConfig.ssid, { password: wifiConfig.pwd }, (_) => log("[wifi]", s_connect));
  }
  if (status === s_connected) {
    wifi.getIP((_: any, info: any) => onConnect(info));
  } else {
    log("[wifi status]", status);
    wifi.on(s_connected, onConnect);
  }
});
wifi.stopAP(() => {});

// 每30秒检测一次网络，如果断开则重启
setInterval(() => {
  wifi.getDetails((details: any) => {
    if (details.status === s_connected) return;

    log(`not wifi ${s_connected} reboot`);
    ESP8266.reboot();
  });
}, 30 * 1000);
