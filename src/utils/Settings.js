export default class Settings {

    constructor(){
        this.domains = [];
        this.language = 'ENGLISH';
    }

    static placeholder(){ return new Settings(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('domains')) p.domains = json.domains;
        return p;
    }
}
