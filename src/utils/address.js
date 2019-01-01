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
}
