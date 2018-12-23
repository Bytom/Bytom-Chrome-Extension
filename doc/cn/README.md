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
