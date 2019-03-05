## Bytom-JS-SDK
Chrome Extension require [Bytom-JS-SDK](https://github.com/Bytom/Bytom-JS-SDK) dependency.
 The SDK mainly in charge of communicate with the indexedDB and the http request.

## WASM
Since all the create-Key relevant functions are contained in the WASM.
```js
let net = {
    main: "http://main-net-host/",
    test: "http://test-net-host/"
};
let bytom = new Bytom(net, "your-path/main.wasm");
```
About [Bytom-WebAssembly](https://github.com/oysheng/Bytom-WebAssembly).

## Communicate between WASM and Javascript
WASM is a GoLang Program, [Go-WebAssembly](https://github.com/golang/go/wiki/WebAssembly).
Javascript can use all the function program by WASM.
