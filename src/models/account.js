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
                balance += asset.balance
              }
            })
          }
        })
        resolve(balance / 100000000)
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
        accounts.forEach(account => {
          this.balance(account.guid).then(balance => {
            account.balance = balance
          })
        })
        resolve(accounts)
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
