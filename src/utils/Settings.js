export default class Settings {

    constructor(){
        const uiLang = (chrome.i18n.getUILanguage().split('_')[0]).split('-')[0]
        this.domains = [];
        this.language = uiLang||'en';
    }

    static placeholder(){ return new Settings(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('domains')) p.domains = json.domains;
        return p;
    }
}
