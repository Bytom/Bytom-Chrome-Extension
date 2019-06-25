import Settings from './Settings';

export default class BytomObj {

    constructor(){
        this.settings = Settings.placeholder();
    }

    static placeholder(){ return new BytomObj(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('settings')) p.settings = Settings.fromJson(json.settings);
        return p;
    }

    clone(){ return BytomObj.fromJson(JSON.parse(JSON.stringify(this))) }
}
