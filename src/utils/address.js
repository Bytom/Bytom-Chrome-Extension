export default class address {
  static short(rawAddress, length) {
    if (rawAddress == undefined) {
      return '-'
    }

    if (length == undefined) {
      length = 7
    }

    let startSome = rawAddress.substr(0, length)
    let endSome = rawAddress.substr(rawAddress.length - length, length)
    return startSome + '...' + endSome
  }

  static isValid(address, netType) {
    if (netType == 'vapor') {
      const vpArray = ['vp', 'tp', 'sp']
      return vpArray.includes( address.substring(0,2) )
    }else{
      const bmArray = ['bm', 'tm', 'sm']
      return bmArray.includes( address.substring(0,2) )
    }
  }
}
