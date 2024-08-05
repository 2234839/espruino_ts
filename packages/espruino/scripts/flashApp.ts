import { readFileSync,writeFileSync } from "fs";
const code:string = readFileSync("./dist/app.js", "utf8");
if(code.startsWith("E.setBootCode")){

}else{
  const runCode = `require("Storage").write("app.js",${JSON.stringify(code)});require("Storage").erase(".varimg");require('ESP8266').reboot()`;
  writeFileSync("./dist/app.js", runCode, "utf8")
}