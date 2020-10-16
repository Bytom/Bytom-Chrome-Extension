export const m3_0_5 = async bytom => {

  const mainnetAccount =  bytom.keychain.pairs
  bytom.keychain.pairs = {
    mainnet: mainnetAccount,
    testnet:{}
  }

  return true;
};
