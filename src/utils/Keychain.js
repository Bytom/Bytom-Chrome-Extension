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
}
