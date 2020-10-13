export default class Keychain {

  constructor(){
    this.pairs = {
      mainnet:{},
      testnet:{}
    };
  }

  static placeholder(){ return new Keychain(); }
  static fromJson(json){
    let p = Object.assign(this.placeholder(), json);
    if(json.hasOwnProperty('pairs')) p.pairs = json.pairs;
    return p;
  }

  findIdentity(publicKey, net){ return Object.values(this.pairs[net]).find(id => id.xpub === publicKey); }
  findByGuid(guid, net){ return Object.values(this.pairs[net]).find(id => id.guid === guid); }
  findByAddress(address, net){ return Object.values(this.pairs[net]).find(id => id.address === address || id.vpAddress=== address); }

  removeByAlias(alias, net){
    if(this.pairs[net][alias]){
      delete(this.pairs[net][alias])
    }
  }
  removeUnverifyIdentity(net){
    const pairObject = Object.values(this.pairs[net]).filter(id => !id.vMnemonic );
    for(let o of pairObject){
      delete this.pairs[net][o.alias];
    }
  }
}
