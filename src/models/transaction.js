import bytom from "./bytom";

let transaction = {};

transaction.list = function(guid, address, start, limit) {
  return bytom.transaction.list(guid, address, start, limit);
};

transaction.blockCount = function() {
  return bytom.query.getblockcount();
};

transaction.asset = function(asset_id) {
  return bytom.query.asset(asset_id);
};

transaction.build = function(guid, to, asset, amount, fee) {
  let retPromise = new Promise((resolve, reject) => {
    bytom.transaction
      .buildPayment(guid, to, asset, Number(amount * 100000000))
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

export default transaction;
