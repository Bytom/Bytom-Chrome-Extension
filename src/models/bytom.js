import Bytom from 'bytom-js-sdk'

var networks = {
  testnetvapor: 'http://app.bycoin.io:3020/api/v1/vapor/',
  testnet: 'http://app.bycoin.io:3020/api/v1/btm/',
  mainnet: 'https://bcapi.bystack.com/api/v1/btm/',
  mainnetvapor: 'https://bcapi.bystack.com/api/v1/vapor/'
}

var bytom = new Bytom(networks, chrome.runtime.getURL('wasm/main.wasm'))

bytom.sdk.networks = function() {
  return bytom.getNetType()
}

bytom.sdk.setupNet = function(network) {
  bytom.setNetType(network)
}

export default bytom.sdk
