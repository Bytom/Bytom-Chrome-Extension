import bytom from './bytom'
import uuid from 'uuid'
import address from "../utils/address";


let account = {
  setupNet: bytom.setupNet
}

account.create = function(accountAlias, keyAlias, passwd, success, error) {
  let retPromise = new Promise((resolve, reject) => {
    if(!keyAlias){
      keyAlias = `${accountAlias}-key-${uuid.v4()}`
    }
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

account.copy = function(guid) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.accounts
      .copyAccountUseServer(guid, 'btm')
      .then(ret => {
        resolve(ret)
      })
      .catch(error => {
        reject(error)
      })
  })
  return retPromise
}

account.listVapor = function(guid) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.accounts
      .listVaporAccountUseServer(guid)
      .then(ret => {
        resolve(ret)
      })
      .catch(error => {
        reject(error)
      })
  })
  return retPromise
}

account.balance = function(guid) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.accounts
      .listAddressUseServer(guid)
      .then(address => {
        let balances = address.balances || []
        let votes = address.votes || []

        resolve({
            balances,
            votes
          })
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
          try{
            const obj = await this.balance(account.guid)
            account.balances = obj.balances
            account.votes = obj.votes
          }catch (e) {
            return e
          }
        })).then(()=>{
          resolve(accounts)
        }).catch(error=>{
          throw error
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
