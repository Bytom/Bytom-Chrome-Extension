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

    stream.onSync(async () => {
      const defaultAccount = await this.getDefaultAccount();
      const net = await this.getDefaultNetwork();
      const accountList = await this.getAccountList();

      // Pushing an instance of Bytomdapp to the web application
      stream.send(
        NetworkMessage.payload(MsgTypes.PUSH_BYTOM, {defaultAccount, net, accountList}),
        EventNames.INJECT
      )

      // Dispatching the loaded event to the web application.
      isReady = true

      document.dispatchEvent(new CustomEvent('chromeBytomLoaded'))
    })

    chrome.runtime.onMessage.addListener(async (obj) => {
      switch (obj.action) {
        case 'updateAccount':
          const defaultAccount = await this.getDefaultAccount();
          if(defaultAccount){
            stream.send(
              NetworkMessage.payload(MsgTypes.UPDATE_BYTOM, {type:'default_account', value: defaultAccount}),
              EventNames.INJECT
            )
          }
          break
        case 'updateNetAndAccounts':
          const net = await this.getDefaultNetwork();
          const accountList = await this.getAccountList();
          stream.send(
            NetworkMessage.payload(MsgTypes.UPDATE_BYTOM, {type:'net', value: net}),
            EventNames.INJECT
          )
          stream.send(
            NetworkMessage.payload(MsgTypes.UPDATE_BYTOM, {type:'accounts', value: accountList}),
            EventNames.INJECT
          )
          break
      }
      return true;
    })
  }


  contentListener(msg) {
    console.log('content.stream.listen:', msg, stream.key)

    if (!isReady) return
    if (!msg) return
    if(!stream.synced && (!msg.hasOwnProperty('type') || msg.type !== 'sync')) {
      stream.send(new Error('inject Error'), PairingTags.INJECTED);
      return;
    }

    let networkMessage = NetworkMessage.fromJson(msg)
    switch (msg.type) {
      case 'sync':
        this.sync(msg)
        break
      case MsgTypes.TRANSFER:
      case MsgTypes.ADVTRANSFER:
      case MsgTypes.SIGNMESSAGE:
      case MsgTypes.SEND:
        this.transfer(msg.type, networkMessage)
        break
      default:
        stream.send(networkMessage.error('errtest'), EventNames.INJECT)
        break
    }
  }

  getVersion() {}

  getDefaultAccount(){
    return InternalMessage.signal(MsgTypes.REQUEST_CURRENT_ACCOUNT)
      .send()
  }

  getDefaultNetwork(){
    return InternalMessage.signal(MsgTypes.REQUEST_CURRENT_NETWORK)
      .send()
  }

  getAccountList(){
    return InternalMessage.signal(MsgTypes.REQUEST_ACCOUNT_LIST)
      .send()
  }

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

  transfer(type, message) {
    if (!isReady) return

    InternalMessage.payload(type, message.payload)
      .send()
      .then(res => this.respond(message, res))
  }
}

const content = new Content()
