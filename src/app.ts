import wifi = require("Wifi");
import { server } from "./server";
import { light } from "./led";
import { log } from "./util";
import http = require("http");
import ESP8266 = require("ESP8266");
import { count, wifiConfig } from "./store";
import { s_connect, s_connected, s_count } from "./const";

// set wifi
// require("Storage").writeJSON("wifi", { ssid: "your ssid", pwd: "your password" });

// light(3000);

log(`boot ${s_count}:${count}`);


const onConnect = (info: { ip: string }) => {
  log(s_connected, info.ip,new Date().toISOString());
  server.listen(3000);
  http.get("http://worldtimeapi.org/api/timezone/Asia/Shanghai", (r) => {
    let d = "";
    r.on("data", (c:any) => (d += c));
    r.on("end", () => log("Beijing time", JSON.parse(d).datetime));
  });
};

// connet wifi
wifi.getDetails((details) => {
  const status = details.status;
  if (!status.startsWith(s_connect)) {
    wifi.connect(wifiConfig.ssid, { password: wifiConfig.pwd }, (_) =>
      log(s_connect)
    );
  }
  if (status === s_connected) {
    wifi.getIP((_, info) => onConnect(info));
  } else {
    wifi.on(s_connected, onConnect);
  }
});
wifi.stopAP(()=>{})

// wifi network watch
setInterval(() => {
  wifi.getDetails((details) => {
    if (details.status !== s_connected) {
      log(`not wifi ${s_connected} reboot`);
      ESP8266.reboot();
    }
  });
}, 30 * 1000);