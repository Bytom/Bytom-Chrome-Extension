import { LocalStream } from 'extension-streams'

export default class InternalMessage {
  constructor() {
    this.type = ''
    this.payload = ''
  }

  static initMessage() {
    return new InternalMessage()
  }

  static fromJson(json) {
    return Object.assign(this.initMessage(), json)
  }

  static payload(type, payload) {
    let p = this.initMessage()
    p.type = type
    p.payload = payload
    return p
  }

  static signal(type) {
    let p = this.initMessage()
    p.type = type
    return p
  }

  send() {
    return LocalStream.send(this)
  }
}
