import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/app.ts"],
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: true,
  // treeshake:true, # 测试时发现增大来 0.3k 的体积
  external: [
    //  espruino 内置模块
    "CC3000",
    "crypto",
    "dgram",
    "ESP8266",
    "Flash",
    "fs",
    "heatshrink",
    "http",
    "neopixel",
    "net",
    "NetworkJS",
    "Storage",
    "TelnetServer",
    "tensorflow",
    "tls",
    "tv",
    "Wifi",
    "WIZnet",
  ],
});
