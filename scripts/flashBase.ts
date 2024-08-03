import { readFileSync,writeFileSync } from "fs";
// var esp = require("espruino");
// esp.init((...arg) => {
//   const code = readFileSync("./dist/app.js", "utf8");
//   const runCode = `E.setBootCode(${JSON.stringify(code)});require('ESP8266').reboot()`;
//   console.log("[runCode]", runCode);
//   esp.sendCode("COM7", runCode, () => {
//     console.log("代码发送完毕");
//   });
// });
const code:string = readFileSync("./dist/base.js", "utf8");
if(code.startsWith("E.setBootCode")){

}else{
  const runCode = `E.setBootCode(${JSON.stringify(code)});require("Storage").erase(".varimg");require('ESP8266').reboot()`;
  writeFileSync("./dist/base.js", runCode, "utf8")
}