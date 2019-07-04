# Byone Chrome Extension
Byone Chrome Extension wallet is a UTXO base Wallet. The extension in charge of the all the Key and Account Management.

## Building locally

- Install [Node.js](https://nodejs.org) version 8 and the latest available npm@6
- Install dependencies: `npm install`
- build for production with minification && crx package with `npm run build`
- Optionally, to rebuild on file changes, run `npm run dev`.
- To package .zip files for distribution, run `npm run zip`, or run the full build & zip with `gulp dist`.

 Uncompressed builds can be found in `/dist`, compressed builds can be found in `/builds` once they're built.


## Architecture

![Architecture Diagram](./doc/architecture-diagram.png)

## Development

```bash
npm install
npm run dev
```

## Build for Publishing

```bash
npm run build
```


## Other Docs
- [How to add custom build to Chrome](./doc/en/add-to-chrome.md)
- [How to live reload on local dependency changes](./doc/en/developing-on-deps.md)
- [How to use Bytom-JS-SDK and WebAssembly](./doc/en/bytom-js-sdk-webassembly.md)
- [中文文档](./doc/cn/README.md)

## Thanks to
Many thanks to the early contributors in Bytom-Community.
- [boboyan](https://github.com/boboyan)
- [shijianzhiwai](https://github.com/shijianzhiwai) 
