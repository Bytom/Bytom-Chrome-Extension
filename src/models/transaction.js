import bytom from "./bytom";
import { snakeize } from "@/utils/utils";


let transaction = {};

transaction.list = function(guid, asset_id, start, limit, tx_types) {
  const filter = {asset_id}
  if(tx_types){
    filter.tx_types = tx_types
  }
  return bytom.transaction.list(guid, filter, null, start, limit);
};

transaction.convertArgument = function(argArray) {
  let fn = function asyncConvert(object){
    const type = object.type
    const value = object.value
    return bytom.transaction.convertArgument(type, value)
      .then(resp => resp.value);
  };

  let actionFunction = argArray.map(fn)
  return Promise.all(actionFunction);
};

transaction.chainStatus = function() {
  return bytom.query.getblockcount();
};

transaction.asset = function(asset_id) {
  return bytom.query.asset(asset_id);
};

transaction.build = function(address, to, asset, amount, fee, confirmations) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .buildPayment(address, to, asset, amount.toString(), fee, confirmations)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
  return retPromise;
};

transaction.buildCrossChain = function(address, to, asset, amount, confirmations) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .buildCrossChain(address, to, asset, amount.toString(), confirmations)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
  return retPromise;
};

transaction.buildVote = function(address, vote, amount, confirmations, memo) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .buildVote(address, vote, amount.toString(), confirmations, memo)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
  return retPromise;
};

transaction.buildVeto = function(address, vote, amount, confirmations, memo) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .buildVeto(address, vote, amount.toString(), confirmations, memo)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
  return retPromise;
};

transaction.buildTransaction = function(address, inputs, outputs, gas, confirmations) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .buildTransaction(address, inputs, outputs, gas, confirmations)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
  return retPromise;
};

transaction.signTransaction = function(guid, transaction, password) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .signTransaction(guid, JSON.stringify(snakeize(transaction)), password)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
  return retPromise;
};

transaction.decodeTransaction = function(rawTx) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .decodeTransaction(rawTx)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
  return retPromise;
};

transaction.transfer = function(guid, transaction, password, address) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .signTransaction(guid, JSON.stringify(snakeize(transaction)), password)
      .then(ret => {
        bytom.transaction
          .submitPayment(address, ret.raw_transaction, ret.signatures)
          .then(res3 => {
            const object ={
              transactionHash: res3.txHash
            }
            resolve(object);
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

transaction.advancedTransfer = function(guid, transaction, password, arrayData, address) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .signTransaction(guid, JSON.stringify(snakeize(transaction)), password)
      .then(ret => {
        let signatures = ret.signatures
        if(arrayData){
          signatures[0] = arrayData
        }
        bytom.transaction
          .submitPayment(address, ret.raw_transaction, signatures)
          .then(res3 => {
            const object ={
              transactionHash: res3.txHash
            }
            resolve(object);
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
