import bytom from './bytom'

let account = {
  setupNet: bytom.setupNet
}

account.create = function(accountAlias, keyAlias, passwd, success, error) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.keys
      .create(keyAlias, passwd)
      .then(res => {
        bytom.accounts
          .createAccountUseServer(res.xpub, accountAlias)
          .then(ret => {
            resolve(ret)
          })
          .catch(error => {
            reject(error)
          })
      })
      .catch(error => {
        reject(error)
      })
  })
  return retPromise
}

const ASSET_BTM =
  'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

account.balance = function(guid, dstAsset) {
  if (dstAsset == undefined) {
    dstAsset = ASSET_BTM
  }

  let retPromise = new Promise((resolve, reject) => {
    bytom.accounts
      .listAddressUseServer(guid)
      .then(addresses => {
        let balance = 0
        addresses.forEach(item => {
          if (item.balances != null) {
            item.balances.forEach(asset => {
              if (asset.asset == dstAsset) {
                balance += Number(asset.balance)
              }
            })
          }
        })
        balance = dstAsset === ASSET_BTM? (balance / 100000000): balance
        resolve(balance)
      })
      .catch(error => {
        reject(error)
      })
  })
  return retPromise
}

account.list = function() {
  let retPromise = new Promise((resolve, reject) => {
    bytom.accounts
      .listAccountUseServer()
      .then(accounts => {
        Promise.all(accounts.map(async (account) => {
          const balance = await this.balance(account.guid)
          account.balance = balance
        })).then(()=>{
          resolve(accounts)
        })
      })
      .catch(error => {
        reject(error)
      })
  })

  return retPromise
}

account.backup = function() {
  return bytom.wallet.backup()
}

account.restore = function(walletImage) {
  return bytom.wallet.restore(walletImage)
}

export default account
