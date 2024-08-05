import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/base.ts","src/app.ts"],
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: true,
  target:'es5',
  // treeshake:true, # 测试时发现增大来 0.3k 的体积
  external: [
    "app.js",
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
