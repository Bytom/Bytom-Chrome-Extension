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
  mainnet:'https://bcapi.movapi.com',
  testnet:'http://161.189.9.64'
}

export const networksJS = {
  mainnet: `${networks['mainnet']}/bytom/v3/`,
  mainnetvapor: `${networks['mainnet']}/vapor/v3/` ,
  testnet: `${networks['testnet']}:4000/bytom/v3/`,
  testnetvapor: `${networks['testnet']}:3000/vapor/v3/` ,
}

