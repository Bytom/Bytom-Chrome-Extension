import NetworkMessage from '@/messages/network'
import * as MsgTypes from './messages/types'
import * as EventNames from '@/messages/event'
import IdGenerator from '@/utils/IdGenerator'

/***
 * This is just a helper to manage resolving fake-async
 * requests using browser messaging.
 */
class DanglingResolver {
  constructor(_id, _resolve, _reject) {
    this.id = _id
    this.resolve = _resolve
    this.reject = _reject
  }
}

let stream = new WeakMap()
let resolvers = new WeakMap()
let currentVersion = new WeakMap()
let requiredVersion = new WeakMap()

/***
 * Messages do not come back on the same thread.
 * To accomplish a future promise structure this method
 * catches all incoming messages and dispenses
 * them to the open promises. */
const _subscribe = () => {
  stream.listenWith(msg => {
    if (!msg || !msg.hasOwnProperty('type')) return false

    for (let i = 0; i < resolvers.length; i++) {
      if (resolvers[i].id === msg.resolver) {
        if (msg.type === 'error') resolvers[i].reject(msg.payload)
        else resolvers[i].resolve(msg.payload)
        resolvers = resolvers.slice(i, 1)
      }
    }
  })
}

/***
 * Turns message sending between the application
 * and the content script into async promises
 * @param _type
 * @param _payload
 */
const _send = (_type, _payload) => {
  return new Promise((resolve, reject) => {
    let id = IdGenerator.numeric(24)
    let message = new NetworkMessage(_type, _payload, id)
    resolvers.push(new DanglingResolver(id, resolve, reject))
    stream.send(message, EventNames.BYTOM)
  })
}

export default class Bytomdapp {
  constructor(_stream, _options) {
    currentVersion = parseFloat(_options.version)
    // this.useIdentity(_options.identity)
    stream = _stream
    resolvers = []

    // setupSigProviders(this)

    _subscribe()
  }

  transfer(to, amount, fee) {
    return _send(MsgTypes.TRANSFER, {
      to: to,
      amount: amount
    })
  }
}
