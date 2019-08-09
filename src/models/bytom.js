import Bytom from 'bytom-js-sdk'

var networks = {
  testnetvapor: 'http://52.82.55.145:3000/api/v1/vapor/',
  testnetbytom: 'http://52.82.55.145:3000/api/v1/btm/',
  solonetbytom: 'http://app.bycoin.io:3060/api/v1/btm/',
  mainnetbytom: 'https://api.bycoin.im:8000/api/v1/btm/'
}

var bytom = new Bytom(networks, chrome.runtime.getURL('wasm/main.wasm'))

bytom.sdk.networks = function() {
  return bytom.getNetType()
}

bytom.sdk.setupNet = function(network) {
  bytom.setNetType(network)
}

export default bytom.sdk
