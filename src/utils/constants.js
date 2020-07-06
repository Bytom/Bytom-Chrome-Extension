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
}

export const networksJS = {
  mainnet: `${networks['mainnet']}/bytom/v3/`,
  mainnetvapor: `${networks['mainnet']}/vapor/v3/` ,
}


export const decimalsMap = {
  mainnet:{
    '184e1cc4ee4845023888810a79eed7a42c02c544cf2c61ceac05e176d575bd46':6,
    '25f2069140fa3ff4d6e0dc1d0fcaa11ace01eb721f115f0f1a5a3782db597fb1':6,
    '78de44ffa1bce37b757c9eae8925b5f199dc4621b412ef0f3f46168865284a93':9,
    'bda946b3110fa46fd94346ce3f05f0760f1b9de72e238835bc4d19f9d64f1742':8,
    'c4644dd6643475d57ed624f63129ab815f282b61f4bb07646d73423a6e1a1563':6,
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff':8
  },
  tesetnet:{
    '328d60d8192425beeaea53dbbc7900778ec06f4ca2e4499f92aea6ca17645d4c':8,
    '4483893ef7d9aac788c0e9e49a12398c1d35a2172adb1c8dc551fd169a6f5703':8,
    '57e5b3a3040e1c0162f64019838fd93b5f33dcde7069fa72aee48a054143443f':8,
    'a0889e1080999e59ed552865a1d3ee677202796222141ccc3552041708aad76c':8,
    'babb18008ba6cf533fed6bc2bb8e98b3978c324f221aa679ba4c2b558a8fa97d':8,
    'd50a426bdaaf1458d161aba4d8c3ebdd095eac7e1bbeb4a0252a3737ccf2d492':8,
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff':8
  }
}
