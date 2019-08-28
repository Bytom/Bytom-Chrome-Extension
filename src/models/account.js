import bytom from './bytom'
import uuid from 'uuid'


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

account.balance = function(guid) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.accounts
      .listAddressUseServer(guid)
      .then(addresses => {
        let balances = []
        let votes = []
        addresses.forEach(address => {
          if (address.balances != null) {
            balances = balances.concat(address.balances)
          }
          if (address.votes != null) {
            votes = votes.concat(address.votes)
          }
        })
        let obj = {};

        balances.forEach(function (balance) {
          if(obj.hasOwnProperty(balance.asset)) {
            obj[balance.asset].balance = Number(obj[balance.asset].balance) + Number(balance.balance);
          } else {
            balance.balance =  Number(balance.balance)
            obj[balance.asset] = balance;
            delete obj[balance.asset]['total_received']
            delete obj[balance.asset]['total_sent']
            // delete obj[balance.asset]['in_btc']
            // delete obj[balance.asset]['in_cny']
            // delete obj[balance.asset]['in_usd']
          }
        });


        let res = [];

        for(let prop in obj) {
          res.push(obj[prop]);
        }

        resolve({
            balances:res,
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
            const balances = await this.balance(account.guid)
            account.balances = balances
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
