export default class Keychain {

  constructor(){
    this.pairs = {};
  }

  static placeholder(){ return new Keychain(); }
  static fromJson(json){
    let p = Object.assign(this.placeholder(), json);
    if(json.hasOwnProperty('pairs')) p.pairs = json.pairs;
    return p;
  }

  findIdentity(publicKey){ return Object.values(this.pairs).find(id => id.xpub === publicKey); }
  findByGuid(guid){ return Object.values(this.pairs).find(id => id.guid === guid); }
  findByAddress(address){ return Object.values(this.pairs).find(id => id.address === address || id.vpAddress=== address); }

  removeByAlias(alias){
    if(this.pairs[alias]){
      delete(this.pairs[alias])
    }
  }
  removeUnverifyIdentity(){
    const pairObject = Object.values(this.pairs).filter(id => !id.vMnemonic );
    for(let o of pairObject){
      delete this.pairs[o.alias];
    }
  }
}
