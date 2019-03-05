# 钱包中文说明文档

## Bytom-JS-SDK
Chrome插件钱包主要依赖[Bytom-JS-SDK](https://github.com/Bytom-Community/Bytom-JS-SDK)（以下简称SDK），SDK主要负责秘钥的生成、秘钥的存储、地址的生成、地址的存储、交易的签名等功能。<br>
通过SDK生成的秘钥会以其公钥为参数请求比原链中心服务器生成一个唯一的账户ID（guid），并默认生成一个地址。<br>
这些信息都会存储在IndexedDB中。<br>

## WASM
由于秘钥的生成依赖WASM，所以您使用Bytom-JS-SDK的时候需要自行构建一个wasm文件（钱包项目中已经默认生成了相关文件：`static/wasm/main.wasm`），并在初始化Bytom-JS-SDK的时候传入您wasm文件在服务器上的路径：
```js
let net = {
    main: "http://main-net-host/",
    test: "http://test-net-host/"
};
let bytom = new Bytom(net, "your-path/main.wasm");
```
wasm构建请参考项目[Bytom-WebAssembly](https://github.com/Bytom-Community/Bytom-WebAssembly)。

## WASM如何与JavaScript交互
由于WASM是使用Go语言编写，请参考Go语言官方文档[Go-WebAssembly](https://github.com/golang/go/wiki/WebAssembly)。<br>
SDK的具体实现参考其项目目录`src/wasm`内的源码。<br>
WASM会向JavaScript全局作用域注册相关的函数，JavaScript直接调用即可，这里需要注意一点的是，WASM函数都是异步的。

## 钱包完整构建流程
由于本项目在`static/wasm`目录已经预生成了wasm文件，所以如果想要构建完整的Chrome插件文件只需要运行下面的命令：
```sh
git clone https://github.com/Bytom-Community/Bytom-Chrome-Extension.git bytom_chrome_wallet # clone项目
cd bytom_chrome_wallet # 进入工作目录
npm install # 安装依赖
npm run build # 构建插件文件（crx文件）
```
生成的chrome-ext.crx文件可以直接拖拽至Chrome浏览器扩展程序界面（ chrome://extensions/ ）安装（建议打开右上角的开发者模式）。<br>
如果您想修改开发本项目，则使用开发构建模式：
```
npm run dev
```
这个时候会在工作目录生成dist目录，在Chrome浏览器扩展程序界面中点击`加载已解压的扩展程序`选择dist文件夹，即可在浏览器中调试程序。
npm进程会监听您对文件的修改，以及时编译代码，将更改提现在程序上（这就和前端开发的dev模式一样）。<br>
如果您想自行构建wasm文件，请参考此项目[Bytom-WebAssembly](https://github.com/Bytom-Community/Bytom-WebAssembly)。
您只需要将构建好的wasm文件拷贝到`static/wasm`目录下，并命名为main.wasm即可。<br>
注意，要想自行构建wasm文件，需要安装Go（最低1.11版本），安装请参考[Go Install](https://golang.org/doc/install)。
