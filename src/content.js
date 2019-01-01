import { EncryptedStream, LocalStream } from 'extension-streams'
import IdGenerator from '@/utils/IdGenerator'
import NetworkMessage from '@/messages/network'
import InternalMessage from '@/messages/internal'

let stream = new WeakMap()
let INJECTION_SCRIPT_FILENAME = 'js/inject.js'
let isReady = false

class Content {
  constructor() {
    this.setupInjectScript()
    this.setupEncryptedStream()
  }

  setupInjectScript() {
    let script = document.createElement('script')
    script.src = chrome.extension.getURL(INJECTION_SCRIPT_FILENAME)
    ;(document.head || document.documentElement).appendChild(script)
    script.onload = () => script.remove()
  }

  setupEncryptedStream() {
    console.log('stream listening...', IdGenerator.text(256))

    stream = new EncryptedStream('bytom', IdGenerator.text(256))
    stream.listenWith(msg => this.contentListener(msg))

    stream.onSync(() => {
      const version = this.getVersion()
      // const version = await this.getVersion();
      // const identity = await this.identityFromPermissions();
      // Pushing an instance of Scatterdapp to the web application
      // stream.send(NetworkMessage.payload(NetworkMessageTypes.PUSH_SCATTER, {version, identity}), PairingTags.INJECTED);
      // Dispatching the loaded event to the web application.
      isReady = true

      document.dispatchEvent(new CustomEvent('chromeBytomLoaded'))
    })
  }

  getVersion() {}

  contentListener(msg) {
    console.log('event.data', msg)
    if (!isReady) return
    if (!msg) return

    let networkMessage = NetworkMessage.fromJson(msg)
    switch (msg.type) {
      case 'sync':
        this.sync(msg)
        break
      case 'auth':
        this.authenticate(networkMessage)
        break

      default:
        break
    }
  }

  respond(message, payload) {
    if (!isReady) return

    const response =
      !payload || payload.hasOwnProperty('isError')
        ? message.error(payload)
        : message.respond(payload)
    stream.send(response, 'injected')
  }

  sync(message) {
    stream.key = message.handshake.length ? message.handshake : null
    stream.send({ type: 'sync' }, 'injected')
    stream.synced = true
  }

  authenticate(message) {
    if (!isReady) return

    InternalMessage.payload('auth', message.payload)
      .send()
      .then(res => this.respond(message, res))
  }
}

const content = new Content()
