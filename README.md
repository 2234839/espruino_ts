# espruino+typescript+vscode

使用 tsup 压缩代码，减少占用
Reduce your footprint by compressing your code with tsup

内置了 uglifyjs_mini 命令，能够生成更小的代码。
The built-in uglifyjs_mini command generates smaller code.

建议使用[常量字符串](./src/const.ts)，目前压缩工具不能自动提取压缩
It is recommended to use [constant string](./src/const.ts), compression tools currently do not automatically extract compressed code.


espruino -p tcp://192.168.2.167 ./dist/main.js

```sh
用法：espruino ...选项... [要上传的文件.js]

  -h,--help                : 显示帮助信息
  -j [job.json]            : 从 JSON 作业文件中加载选项 - 参见 configDefaults.json
                               不带作业文件名时，创建一个新的作业文件，文件名与上传的文件相同
  -v,--verbose             : 显示详细信息
  -q,--quiet               : 安静模式 - 除 Espruino 输出外不显示其他信息
  -m,--minify              : 在发送代码前压缩代码
  -t,--time                : 上传代码时设置 Espruino 的时间
  -w,--watch               : 如果上传的是 JS 文件，继续监视文件变化并重新上传
  -e command               : 在 Espruino 上执行给定的表达式
                               如果没有指定上传文件但使用了 -e，Espruino 将不会重启
  --sleep 10               : 上传代码后休眠指定的秒数
  -n                       : 不连接到 Espruino 上传代码
  --board BRDNAME/BRD.json : 使用指定的板子名称或文件，而不是在连接时检查
  --ide [8080]             : 在指定的端口提供 Espruino Web IDE。如果未指定，默认端口是 8080。

  -p,--port /dev/ttyX      : 连接到一个串口
  -p,--port aa:bb:cc:dd:ee : 通过蓝牙地址连接到设备
  -p,--port tcp://192.168.1.50 : 连接到网络设备（默认端口 23）
  -d deviceName            : 连接到第一个名称包含 deviceName 的设备
  --download fileName      : 下载与 fileName 匹配的文件到当前目录
  -b baudRate              : 设置串口连接的波特率
                               使用 USB 时无效，默认值为 9600
  --no-ble                 : 禁用 Bluetooth Low Energy（使用 'noble' 模块）
  --remote peer-id         : 启用 WebRTC 连接到手机（从 espruino.com/ide/remote 复制 Peer ID）
  --list                   : 列出所有可用设备并退出

  --listconfigs            : 显示所有可用的配置选项并退出
  --config key=value       : 设置 Espruino 的内部配置选项

  -o out.js                : 将实际发送到 Espruino 的 JS 代码写入文件
  --ohex out.hex           : 将 JS 代码写入 hex 文件，就像通过 E.setBootCode 发送一样
  --storage fn:data.bin    : 从磁盘加载 'data.bin' 并将其写入存储为 'fn'
  --storage .boot0:-       : 将程序代码存储在指定的存储文件中（而不是 .bootcode）
  --scan-timeout 3         : 扫描 BLE 设备的最大时间（默认 3 秒）

  -f firmware.bin[:N]      : 更新 Espruino 的固件到指定的文件
                               必须是 USB Espruino 处于引导加载模式
                               （蓝牙不支持当前的固件更新）。
                               可选择跳过 bin 文件的前 N 个字节。

如果没有指定文件、命令或固件更新，这将作为一个终端与 Espruino 直接通信。按 Ctrl-C 两次退出。

请通过 https://github.com/espruino/EspruinoTools/issues 报告错误
```

上传代码到开发版
espruino -p tcp://192.168.2.167 .\dist\app.js
espruino -b 115200 app.js -e "save()"
espruino -b 115200 .\dist\app.js -e "save();require('ESP8266').reboot()"
espruino -b 115200 .\dist\app.js --storage .boot0:.boot0

require("Storage").read(".boot0")
删除
require("Storage").erase(".bootcde")
require("Storage").erase(".boot0")
require("Storage").list()
require("Storage").write(".boot0", )
require("Storage").write(".boot0",'require("./app.js")')
存储到 .bootcde
E.setBootCode("")
require("ESP8266").reboot()