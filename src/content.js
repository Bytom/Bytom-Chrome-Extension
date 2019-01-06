import { EncryptedStream, LocalStream } from 'extension-streams'
import IdGenerator from '@/utils/IdGenerator'
import NetworkMessage from '@/messages/network'
import InternalMessage from '@/messages/internal'
import * as MsgTypes from './messages/types'
import * as EventNames from '@/messages/event'

let stream = new WeakMap()
let INJECTION_SCRIPT_FILENAME = 'js/inject.js'
let isReady = false

class Content {
  constructor() {
    this.setupEncryptedStream()
    this.injectInteractionScript()
  }

  injectInteractionScript() {
    let script = document.createElement('script')
    script.src = chrome.extension.getURL(INJECTION_SCRIPT_FILENAME)
    ;(document.head || document.documentElement).appendChild(script)
    script.onload = () => script.remove()
  }

  setupEncryptedStream() {
    console.log('stream listening...', IdGenerator.text(256))

    stream = new EncryptedStream(EventNames.BYTOM, IdGenerator.text(256))
    stream.listenWith(msg => this.contentListener(msg))

    stream.onSync(() => {
      const version = this.getVersion()
      // const version = await this.getVersion();
      // const identity = await this.identityFromPermissions();

      // Pushing an instance of Scatterdapp to the web application
      stream.send(
        NetworkMessage.payload(MsgTypes.PUSH_BYTOM, {}),
        EventNames.INJECT
      )

      // Dispatching the loaded event to the web application.
      isReady = true

      document.dispatchEvent(new CustomEvent('chromeBytomLoaded'))
    })
  }

  contentListener(msg) {
    console.log('content.stream.listen:', msg, stream.key)

    if (!isReady) return
    if (!msg) return

    let networkMessage = NetworkMessage.fromJson(msg)
    switch (msg.type) {
      case 'sync':
        this.sync(msg)
        break
      case MsgTypes.TRANSFER:
        this.transfer(networkMessage)
        break
      default:
        stream.send(networkMessage.error('errtest'), EventNames.INJECT)
        break
    }
  }

  getVersion() {}

  respond(message, payload) {
    if (!isReady) return

    console.log(222, message, payload)
    const response =
      !payload || payload.hasOwnProperty('isError')
        ? message.error(payload)
        : message.respond(payload)
    stream.send(response, EventNames.INJECT)
  }

  sync(message) {
    stream.key = message.handshake.length ? message.handshake : null
    stream.send({ type: 'sync' }, EventNames.INJECT)
    stream.synced = true
  }

  transfer(message) {
    if (!isReady) return

    InternalMessage.payload(MsgTypes.TRANSFER, message.payload)
      .send()
      .then(res => this.respond(message, res))
  }
}

const content = new Content()
