import Bytom from 'bytom-js-sdk'
import { networksJS as networks} from '../utils/constants'

var bytom = new Bytom(networks)

bytom.sdk.networks = function() {
  return bytom.getNetType()
}

bytom.sdk.setupNet = function(network) {
  bytom.setNetType(network)
}

export default bytom.sdk
