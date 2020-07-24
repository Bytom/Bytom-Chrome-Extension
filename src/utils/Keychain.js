export default class Keychain {

  constructor(){
    this.keys = {};
  }

  static placeholder(){ return new Keychain(); }
  static fromJson(json){
    let p = Object.assign(this.placeholder(), json);
    if(json.hasOwnProperty('keys')) p.keys = json.keys;
    return p;
  }

  findIdentity(publicKey){ return Object.values(this.keys).find(id => id.xpub === publicKey); }
}
