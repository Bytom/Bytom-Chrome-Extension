import bytom from "./bytom";

let transaction = {};

transaction.list = function(guid, address, start, limit) {
  return bytom.transaction.list(guid, address, start, limit);
};

transaction.convertArgument = function(argArray) {
  let fn = function asyncConvert(object){
    const type = object.type
    const value = object.value
    return bytom.transaction.convertArgument(type, value)
      .then(resp => resp.value);
  };

  let actionFunction = argArray.map(fn)
  console.log(actionFunction)
  return Promise.all(actionFunction);
};

transaction.blockCount = function() {
  return bytom.query.getblockcount();
};

transaction.asset = function(asset_id) {
  return bytom.query.asset(asset_id);
};

transaction.build = function(guid, to, asset, amount, fee, confirmations) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .buildPayment(guid, to, asset, Number(amount), Number(fee*100000000), confirmations)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
  return retPromise;
};

transaction.buildTransaction = function(guid, inputs, outputs, gas, confirmations) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .buildTransaction(guid, inputs, outputs, gas, confirmations)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
  return retPromise;
};

transaction.transfer = function(guid, transaction, password) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .signTransaction(guid, JSON.stringify(transaction), password)
      .then(ret => {
        bytom.transaction
          .submitPayment(guid, ret.raw_transaction, ret.signatures)
          .then(res3 => {
            resolve(res3);
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });

  return retPromise;
};


transaction.signMessage = function(message, password, address) {
  return bytom.keys.signMessage(message, password,address);
};

transaction.advancedTransfer = function(guid, transaction, password, arrayData) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .signTransaction(guid, JSON.stringify(transaction), password)
      .then(ret => {
        let signatures = ret.signatures
        if(arrayData){
          signatures[0] = arrayData
        }
        bytom.transaction
          .submitPayment(guid, ret.raw_transaction, signatures)
          .then(res3 => {
            resolve(res3);
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });

  return retPromise;
};

export default transaction;
