export default class Prompt {

    constructor(_type = '', _domain = '', _responder = null){
        this.type = _type;
        this.domain = _domain;
        // this.network = _network;
        // this.data = _data;
        this.responder = _responder;
    }

    static placeholder(){ return new Prompt(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }

    routeName(){
        return `${this.type}`;
    }

}
