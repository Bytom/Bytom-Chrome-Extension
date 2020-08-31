import bytom from './bytom'
import uuid from 'uuid'
import * as Actions from '../store/constants';
import _ from 'lodash'
import {getDomains, camelize} from '@/utils/utils.js'

let account = {
  setupNet: bytom.setupNet
}

account.createKey = function(accountAlias, keyAlias, passwd, context) {
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
    _bytom.settings.netType = 'bytom';

    const resultObj = bytom.keys.createKey(keyAlias, passwd)

    resultObj.alias = accountAlias
    resultObj.keyAlias = keyAlias
    resultObj.vMnemonic = false

    context[Actions.SET_MNEMONIC](resultObj['mnemonic']).then(()=>{
      delete resultObj['mnemonic']

      _bytom.currentAccount = resultObj
      context[Actions.UPDATE_STORED_BYTOM](_bytom).then(() => {
        resolve(resultObj)
      }).catch(e => { throw e })
    })
    .catch(error => {
      reject(error)
    })
  })
  return retPromise
}

account.createAccount = function( context) {
  let retPromise = new Promise((resolve, reject) => {
    const _bytom = context.bytom.clone();
    const currentAccount = _bytom.currentAccount

    const keystore = currentAccount.keystore
    bytom.setupNet(`${context.net}bytom`)
    bytom.accounts.createNewAccount(keystore.xpub).then( async (ret) => {
      let resultObj =  Object.assign(currentAccount, ret)
      resultObj.vMnemonic = true;

      const domains = await getDomains();
      _bytom.settings.domains = Array.from(new Set(_bytom.settings.domains.concat(domains)))

      _bytom.keychain.pairs[currentAccount.alias] = resultObj
      _bytom.currentAccount = resultObj
      context[Actions.UPDATE_STORED_BYTOM](_bytom).then(() => {
        resolve(resultObj)
      }).catch(e => { throw e })
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

    _bytom.settings.netType = 'bytom';

    bytom.setupNet(`${context.net}bytom`)
    bytom.wallet.list(res.xpub).then(async (wallet) =>{
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

      const domains = await getDomains();
      _bytom.settings.domains = Array.from(new Set(_bytom.settings.domains.concat(domains)))

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

    _bytom.settings.netType = 'bytom';

    bytom.setupNet(`${context.net}bytom`)
    bytom.wallet.list(res.xpub).then(async (wallet) =>{
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


      const domains = await getDomains();
      _bytom.settings.domains = Array.from(new Set(_bytom.settings.domains.concat(domains)))

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
  return  bytom.accounts
      .listAccountUseServer()
}
account.listKeyByXpubOld = function(xpub){
  return  bytom.keys
    .getKeyByXPub(xpub)
}

account.backup = function() {
  return bytom.wallet.backup()
}

account.isValidMnemonic = function(mnemonic) {
  return bytom.keys.isValidMnemonic(mnemonic)
}

account.isValidKeystore = function(keystore, context) {
  const walletImage = camelize(JSON.parse(keystore));
  //bycoin && bytom wallet
  if(walletImage.keyImages && walletImage.keyImages.xkeys ){
    const keys = walletImage.keyImages.xkeys;
    if(keys.length>1){
      throw(context.$t('error.BTM0010'))
    }else if(keys.length===0){
      throw(context.$t('error.BTM0011'))
    }else{
      const key = keys[0]
      const xpub = key.xpub
      if(context.bytom.keychain.findIdentity(xpub)){
        throw(context.$t('error.BTM0012'))
      }else{
        return key
      }
    }
  }
  //V2
  else if(walletImage['accounts-server']){
    const account = walletImage['accounts-server'].filter(a => a.net === context.net)
    if(account.length>1){
      throw(context.$t('error.BTM0010'))
    }else if(account.length===0){
      throw(context.$t('error.BTM0011'))
    }else{
      const xpub = account[0].rootXPub
      if(context.bytom.keychain.findIdentity(xpub)){
        throw(context.$t('error.BTM0012'))
      }else{
        const key = walletImage["keys"].find(key => key.xpub === xpub)
        return JSON.parse(key.key)
      }
    }
  }
  //invalid format
  else if(!walletImage['crypto']){
    throw(context.$t('error.BTM0011'))
  }
  return walletImage
}

account.isAliasValid = function(alias, context){

  const hanArray = (alias.match(/[\u3000\u3400-\u4DBF\u4E00-\u9FFF]+/g) || []).join('')
  if(hanArray.length> 7){
    throw(context.$t('error.BTM0013'))
  }else if( alias.length >9 ){
    throw(context.$t('error.BTM0014'))
  }
}

account.decryptMnemonic = function(vault,password, context) {
  const keystore = context.bytom.currentAccount.keystore;
  return bytom.keys.decryptMnemonic(vault, password, keystore)
}


account.createOld = function(accountAlias, keyAlias, passwd, success, error) {
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

account.isValidPassword = function(keystore, password){
  return bytom.keys.verifyPassword(keystore, password)
}

export default account
