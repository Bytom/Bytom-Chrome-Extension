import bytom from './bytom'
import uuid from 'uuid'
import * as Actions from '../store/constants';
import _ from 'lodash'

let account = {
  setupNet: bytom.setupNet
}

account.create = function(accountAlias, keyAlias, passwd, context) {
  let retPromise = new Promise((resolve, reject) => {
    if (!keyAlias) {
      keyAlias = `${accountAlias}-key-${uuid.v4()}`
    }

    const _bytom = context.bytom.clone();

    const accountObject = _bytom.keychain.pairs[accountAlias]
    if(accountObject && accountObject.vMnemonic){
      reject('Alias already exist, please use another alias.')
    }

    _bytom.keychain.removeUnverifyIdentity();

    const res = bytom.keys.createKey(keyAlias, passwd)
    bytom.accounts.createNewAccount(res.xpub).then(ret => {
      let resultObj =  Object.assign(res, ret)
      resultObj.alias = accountAlias
      resultObj.keyAlias = keyAlias
      resultObj.vMnemonic = false

      _bytom.keychain.pairs[accountAlias] = resultObj
      _bytom.currentAccount = resultObj

      context[Actions.UPDATE_STORED_BYTOM](_bytom).then(() => {
        resolve(ret)
      })
        .catch(error => {
          reject(error)
        })

    })
  })
  return retPromise
}


account.restoreByMnemonic = function(accountAlias, mnemonic, passwd, context) {
  let retPromise = new Promise((resolve, reject) => {
    const keyAlias = `${accountAlias}-key-${uuid.v4()}`

    const _bytom = context.bytom.clone();

    const accountObject = _bytom.keychain.pairs[accountAlias]
    if(accountObject && accountObject.vMnemonic){
      reject('Alias already exist, please use another alias.')
    }

    _bytom.keychain.removeUnverifyIdentity();

    const res = bytom.keys.restoreFromMnemonic(keyAlias, passwd, mnemonic)

    bytom.wallet.list(res.xpub).then(wallet =>{
      let walletInfo
      if(wallet.length>0){
        let ret = {
          guid:wallet[0].guid,
          address:wallet[0].addresses[0]
        }

        walletInfo = Promise.resolve(ret)
      }else{
        walletInfo = bytom.accounts.createNewAccount(res.xpub)
      }

      walletInfo.then(ret => {
        let resultObj =  Object.assign(res, ret)
        resultObj.alias = accountAlias
        resultObj.keyAlias = keyAlias
        resultObj.vMnemonic = true

        _bytom.keychain.pairs[accountAlias] = resultObj
        _bytom.currentAccount = resultObj

        context[Actions.UPDATE_STORED_BYTOM](_bytom).then(() => {
          resolve(ret)
        })
          .catch(error => {
            reject(error)
          })

      })
    })
  })
  return retPromise
}

account.restoreByKeystore = function(accountAlias, keystore, password, context) {
  let retPromise = new Promise((resolve, reject) => {

    const _bytom = context.bytom.clone();

    const accountObject = _bytom.keychain.pairs[accountAlias]
    if(accountObject && accountObject.vMnemonic){
      reject('Alias already exist, please use another alias.')
    }

    _bytom.keychain.removeUnverifyIdentity();

    const res = bytom.keys.restoreFromKeystore(password, keystore)

    bytom.wallet.list(res.xpub).then(wallet =>{
      let walletInfo
      if(wallet.length>0){
        let ret = {
          guid:wallet[0].guid,
          address:wallet[0].addresses[0]
        }

        walletInfo = Promise.resolve(ret)
      }else{
        walletInfo = bytom.accounts.createNewAccount(res.xpub)
      }

      walletInfo.then(ret => {
        let resultObj =  Object.assign(ret, {})
        resultObj.alias = accountAlias
        resultObj.keyAlias = res.keyAlias
        resultObj.vMnemonic = true
        resultObj.keystore = keystore
        resultObj.xpub = res.xpub

        _bytom.keychain.pairs[accountAlias] = resultObj
        _bytom.currentAccount = resultObj

        context[Actions.UPDATE_STORED_BYTOM](_bytom).then(() => {
          resolve(ret)
        })
          .catch(error => {
            reject(error)
          })

      })
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

account.balance = function(address , context) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.accounts
      .listAddressUseServer(address)
      .then(address => {
        let balances = address.balances || []
        let votes = address.votes || []
        const _bytom = context.bytom.clone();

        const isVapor = _bytom.settings.netType === 'vapor'
        const _currentBalance = isVapor? _bytom.currentAccount.vpBalances : _bytom.currentAccount.balances

        const balanceNotEqual = !_.isEqual(_currentBalance, balances)
        const voteNotEqual = ( isVapor && !_.isEqual(_bytom.currentAccount.votes, votes))

        if(balanceNotEqual || voteNotEqual) {
          //update AccountList

          if (balanceNotEqual) {
            if (isVapor) {
              _bytom.currentAccount.vpBalances = balances;
              _bytom.keychain.pairs[_bytom.currentAccount.alias].vpBalances =balances
            } else {
              _bytom.currentAccount.balances = balances;
              _bytom.keychain.pairs[_bytom.currentAccount.alias].balances = balances
            }
          }

          if (voteNotEqual) {
            _bytom.currentAccount.votes = votes;
            _bytom.keychain.pairs[_bytom.currentAccount.alias].votes = votes
          }

          context[Actions.UPDATE_STORED_BYTOM](_bytom)
        }

        resolve()
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

account.isValidMnemonic = function(mnemonic) {
  return bytom.keys.isValidMnemonic(mnemonic)
}

account.isValidKeystore = function(keystore) {
  return bytom.keys.isValidKeystore(keystore)
}

account.decryptMnemonic = function(vault,password, context) {
  const keystore = context.bytom.currentAccount.keystore;
  return bytom.keys.decryptMnemonic(vault, password, keystore)
}

export default account
