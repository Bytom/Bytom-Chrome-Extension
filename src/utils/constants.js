export const BTM = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export const camelize = (object) => {
  for (let key in object) {
    let value = object[key]
    let newKey = key

    if (/_/.test(key)) {
      newKey = key.replace(/([_][a-z])/g, v => v[1].toUpperCase())
      delete object[key]
    }

    if (typeof value == 'object') {
      value = camelize(value)
    }

    object[newKey] = value
  }

  return object
}

export const networks = {
  mainnet:'https://bcapi.bystack.com',
}

export const networksJS = {
  mainnet: `${networks['mainnet']}/api/v2/btm/`,
  mainnetvapor: `${networks['mainnet']}/api/v2/vapor/`
}

