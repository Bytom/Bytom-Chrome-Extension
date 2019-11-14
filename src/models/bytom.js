import Bytom from 'bytom-js-sdk'

var networks = {
  mainnet: 'https://bcapi.bystack.com/api/v2/btm/',
  mainnetvapor: 'https://bcapi.bystack.com/api/v2/vapor/'
}

var bytom = new Bytom(networks, chrome.runtime.getURL('wasm/main.wasm'))

bytom.sdk.networks = function() {
  return bytom.getNetType()
}

bytom.sdk.setupNet = function(network) {
  bytom.setNetType(network)
}

export default bytom.sdk
