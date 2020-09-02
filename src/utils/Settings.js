import uuid from 'uuid'

export default class Settings {

    constructor(){
        const uiLang = (chrome.i18n.getUILanguage().split('_')[0]).split('-')[0]
        this.domains = []
        this.language = uiLang||'en';
        this.netType ='bytom';
        this.network ='mainnet';
        // this.network ='testnet';
        this.currency = uiLang ==='en'?'inUsd':"inCny"
        this.domainsMeta ={}
        this.clientId = uuid.v4()
    }


    static placeholder(){ return new Settings(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('domains')) p.domains = json.domains;
        return p;
    }
}
