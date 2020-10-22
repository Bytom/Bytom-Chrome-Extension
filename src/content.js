import { EncryptedStream, LocalStream } from 'extension-streams'
import IdGenerator from '@/utils/IdGenerator'
import NetworkMessage from '@/messages/network'
import InternalMessage from '@/messages/internal'
import * as MsgTypes from './messages/types'
import * as EventNames from '@/messages/event'
import { strippedHost, strippedFavicon } from '@/utils/GenericTools'
import _ from 'lodash';


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
      const chain = await this.getDefaultChain()

      // Pushing an instance of Bytomdapp to the web application
      stream.send(
        NetworkMessage.payload(MsgTypes.PUSH_BYTOM, {defaultAccount, net, chain}),
        EventNames.INJECT
      )

      // Dispatching the loaded event to the web application.
      isReady = true

      document.dispatchEvent(new CustomEvent('bytomLoaded'))
      document.dispatchEvent(new CustomEvent('chromeBytomLoaded'))
    })

    chrome.storage.onChanged.addListener(async (evt) => {
      const newValue = evt.bytom.newValue;
      const oldValue = evt.bytom.oldValue
      if(newValue.settings.network !== oldValue.settings.network){
        const net = await this.getDefaultNetwork();
        const defaultAccount = await this.getDefaultAccount();
        stream.send(
          NetworkMessage.payload(MsgTypes.UPDATE_BYTOM, [{type:'net', value: net}, {type:'default_account', value: defaultAccount}]),
          EventNames.INJECT
        )
      }else if(newValue.currentAccount.guid !== oldValue.currentAccount.guid){
        const defaultAccount = await this.getDefaultAccount();
        if(defaultAccount){
          stream.send(
            NetworkMessage.payload(MsgTypes.UPDATE_BYTOM, [{type:'default_account', value: defaultAccount}]),
            EventNames.INJECT
          )
        }
      }else if(newValue.settings.netType!== oldValue.settings.netType){
        const chain = await this.getDefaultChain();
        const defaultAccount = await this.getDefaultAccount();
        stream.send(
          NetworkMessage.payload(MsgTypes.UPDATE_BYTOM, [{type:'chain', value: chain}, {type:'default_account', value: defaultAccount}]),
          EventNames.INJECT
        )
      }
    });
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
      case MsgTypes.SIGNTRANSACTION:
      case MsgTypes.ADVTRANSFER:
      case MsgTypes.SIGNMESSAGE:
        this.prompt(msg.type, networkMessage)
        break
      case MsgTypes.SETCHAIN:
      case MsgTypes.SEND:
        this.send(msg.type, networkMessage)
        break
      case MsgTypes.ENABLE:
      case MsgTypes.DISABLE:
        this.enable(msg.type, networkMessage)
        break
      default:
        stream.send(networkMessage.error('errtest'), EventNames.INJECT)
        break
    }
  }

  getVersion() {}

  getDefaultAccount(){
    return InternalMessage.payload(MsgTypes.REQUEST_CURRENT_ACCOUNT,{domain:strippedHost()})
      .send()
  }

  getDefaultNetwork(){
    return InternalMessage.signal(MsgTypes.REQUEST_CURRENT_NETWORK)
      .send()
  }

  getDefaultChain(){
    return InternalMessage.signal(MsgTypes.REQUEST_CURRENT_CHAIN_TYPE)
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

  send(type, message) {
    if (!isReady) return

    InternalMessage.payload(type, message.payload)
      .send()
      .then(res => this.respond(message, res))
  }

  prompt(type, message) {
    if (!isReady) return

    const payload = {
      value: message.payload,
      domain: strippedHost()
    }

    InternalMessage.payload(type,payload)
      .send()
      .then(res => this.respond(message, res))
  }

  enable(type, networkMessage) {
    if (!isReady) return

    networkMessage.payload ={
      domain: strippedHost(),
      title: document.title,
      icon: strippedFavicon()
    }

    this.send(type, networkMessage)
  }

}

const content = new Content()
