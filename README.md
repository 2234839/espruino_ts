# espruino+typescript+vscode

使用 tsup 压缩代码，减少占用
Reduce your footprint by compressing your code with tsup

内置了 uglifyjs_mini 命令，能够生成更小的代码。
The built-in uglifyjs_mini command generates smaller code.

建议使用[常量字符串](./src/const.ts)，目前压缩工具不能自动提取压缩
It is recommended to use [constant string](./src/const.ts), compression tools currently do not automatically extract compressed code.


