import bytom from './bytom'
import uuid from 'uuid'
import * as Actions from '../store/constants';


let account = {
  setupNet: bytom.setupNet
}

account.create = function(accountAlias, keyAlias, passwd, context) {
  let retPromise = new Promise((resolve, reject) => {
    if(!keyAlias){
      keyAlias = `${accountAlias}-key-${uuid.v4()}`
    }

    const _bytom = context.bytom.clone();
    bytom.keys
      .createKey(keyAlias, passwd)
      .then(res => {
        _bytom.keychain.keys[keyAlias] = res
        context[Actions.UPDATE_STORED_BYTOM](_bytom).then(() => {
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

        });

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

account.balance = function(address) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.accounts
      .listAddressUseServer(address)
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

account.restore = function(walletImage, password) {
  return bytom.wallet.restore(walletImage, password)
}

export default account
