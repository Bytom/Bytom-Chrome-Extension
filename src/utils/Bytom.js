import Settings from './Settings';
import Keychain from './Keychain';
import Meta from './Meta';

export default class BytomObj {

    constructor(){
      this.meta = Meta.placeholder();
      this.settings = Settings.placeholder();
      this.keychain = Keychain.placeholder();
      this.histories = [];
    }

    static placeholder(){ return new BytomObj(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('meta')) p.meta = Meta.fromJson(json.meta);
        if(json.hasOwnProperty('settings')) p.settings = Settings.fromJson(json.settings);
        if(json.hasOwnProperty('keychain'))
          p.keychain = (typeof json.keychain === 'string')
            ? json.keychain : Keychain.fromJson(json.keychain);

        return p;
    }

    clone(){ return BytomObj.fromJson(JSON.parse(JSON.stringify(this))) }
}
