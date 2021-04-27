import { LocalStream } from 'extension-streams'
import InternalMessage from '@/messages/internal'
import * as MsgTypes from './messages/types'
import NotificationService from './services/NotificationService'
import StorageService from './services/StorageService'
import Prompt from './prompts/Prompt';
import * as PromptTypes from './prompts/PromptTypes'
import migrate from './migrations/migrator'

import _ from 'lodash'
import Error from './utils/errors/Error'
import { BTM, camelize } from './utils/constants'

import account from "@/models/account";

let prompt = null;
let lockTime = null;

export default class Background {
  constructor() {
    this.setupInternalMessaging()
  }

  setupInternalMessaging() {
    LocalStream.watch((request, sendResponse) => {
      console.log(request)
      const message = InternalMessage.fromJson(request)
      this.dispatchMessage(sendResponse, message)
    })
  }

  dispatchMessage(sendResponse, message) {
    switch (message.type) {
      case MsgTypes.SETCHAIN:
        Background.setChain(sendResponse, message.payload)
        break
      case MsgTypes.TRANSFER:
        this.transfer(sendResponse, message.payload)
        break
      case MsgTypes.ADVTRANSFER:
        this.advancedTransfer(sendResponse, message.payload)
        break
      case MsgTypes.SEND:
        this.send(sendResponse, message.payload)
        break
      case MsgTypes.SIGNTRANSACTION:
        this.signTransaction(sendResponse, message.payload)
        break
      case MsgTypes.SIGNMESSAGE:
        this.signMessage(sendResponse, message.payload)
        break
      case MsgTypes.REQUEST_CURRENT_ACCOUNT:
        this.requestCurrentAccount(sendResponse, message.payload)
        break
      case MsgTypes.REQUEST_CURRENT_NETWORK:
        this.requestCurrentNetwork(sendResponse)
        break
      case MsgTypes.REQUEST_CURRENT_CHAIN_TYPE:
        this.requestCurrentChain(sendResponse)
        break
      case MsgTypes.ENABLE:
        Background.authenticate(sendResponse, message.payload)
        break
      case MsgTypes.DISABLE:
        Background.disauthenticate(sendResponse, message.payload)
        break
      case MsgTypes.SET_PROMPT:
        Background.setPrompt(sendResponse, message.payload);
        break;
      case MsgTypes.GET_PROMPT:
        Background.getPrompt(sendResponse);
        break;
      case MsgTypes.LOAD:
        Background.load(sendResponse);
        break;
      case MsgTypes.UPDATE:
        Background.update(sendResponse, message.payload);
        break;
    }
  }

  static setPrompt(sendResponse, notification){
    prompt = notification;
    sendResponse(true);
  }

  static getPrompt(sendResponse){
    sendResponse(prompt);
  }

  signMessage(sendResponse, payload) {
    var requestBody = payload.value

    if(requestBody.address === undefined){
      sendResponse(Error.typeMissed('address'));
      return false;
    }
    if(requestBody.message === undefined){
      sendResponse(Error.typeMissed('message'));
      return false;
    }

    const {domain} = payload;
    const data={
      value: requestBody,
      type:  'message'
    }

    NotificationService.open(new Prompt(PromptTypes.REQUEST_PROMPT, domain, data ,approved => {
      sendResponse(camelize(approved));
    }));
  }

  transfer(sendResponse, payload) {
    var requestBody = payload.value

    if(requestBody.from === undefined){
      sendResponse(Error.typeMissed('from'));
      return false;
    }
    if(requestBody.to === undefined){
      sendResponse(Error.typeMissed('to'));
      return false;
    }
    if(requestBody.asset === undefined){
      sendResponse(Error.typeMissed('asset'));
      return false;
    }
    if(typeof requestBody.to === 'string' && requestBody.amount === undefined){
      sendResponse(Error.typeMissed('amount'));
      return false;
    }

    const {domain} = payload;
    const data={
      value: requestBody,
      type:  'transfer'
    }

    NotificationService.open(new Prompt(PromptTypes.REQUEST_PROMPT, domain, data ,approved => {
      sendResponse(camelize(approved));
    }));
  }

  advancedTransfer(sendResponse, payload) {
    var requestBody = payload.value

    if(requestBody.input === undefined){
      sendResponse(Error.typeMissed('input'));
      return false;
    }
    if(requestBody.output === undefined){
      sendResponse(Error.typeMissed('output'));
      return false;
    }
    if(requestBody.gas === undefined){
      sendResponse(Error.typeMissed('gas'));
      return false;
    }

    const {domain} = payload;

    const data={
      value: requestBody,
      type:  'advTransfer'
    }

    NotificationService.open(new Prompt(PromptTypes.REQUEST_PROMPT, domain, data ,approved => {
      sendResponse(camelize(approved));
    }));

  }

  signTransaction(sendResponse, payload) {
    const {domain,  value} = payload;

    const data={
      value: value,
      type:  'signTransaction'
    }

    NotificationService.open(new Prompt(PromptTypes.REQUEST_PROMPT, domain, data ,approved => {
      sendResponse(camelize(approved));
    }));
  }

  requestCurrentAccount(sendResponse, payload){
    Background.load(bytom => {
      const domain = payload.domain;
      if(bytom.settings.domains.find(_domain => _domain === domain)) {
        const currentAccount =  bytom.currentAccount
        const {vpAddress, address} = currentAccount
        let account = {
          addresses: [vpAddress, address],
          rootXPub: currentAccount.xpub
        }
        if(bytom.settings.netType === 'vapor'){
          account.address = vpAddress;
        }else{
          account.address = address;
        }

        sendResponse(account)
      } else{
        sendResponse(null);
        return false;
      }
    })

  }

  requestCurrentNetwork(sendResponse){
    Background.load(bytom => {
        sendResponse(bytom.settings.network);
    })
  }

  requestCurrentChain(sendResponse){
    Background.load(bytom => {
      const chain = bytom.settings.netType ==='vapor'?'vapor':'bytom'
      sendResponse(chain);
    })
  }

  send(sendResponse, payload) {
    const action = payload.action
    if(action){
      let promise
      switch (action){
        case 'listAllAccount':
          promise = accountAction.list()
          break
      }
      if(promise){
        promise.then(resp =>
        {
          sendResponse(resp)
        })
      }
    }
  }

  /***
   * Returns the saved instance of Bytom from the storage
   * @param sendResponse - Delegating response handler
   * @returns {Bytom}
   */
  static load(sendResponse){
    StorageService.get().then(async bytom => {

      const migrated = await migrate(bytom);
      if(migrated) this.update(() => {}, bytom);
      sendResponse(bytom)
    })
  }

  /***
   * Updates the Scatter instance inside persistent storage
   * @param sendResponse - Delegating response handler
   * @param bytom - The updated cleartext Scatter instance
   * @returns {boolean}
   */
  static update(sendResponse, bytom){
    StorageService.save(bytom).then(saved => {
      sendResponse(bytom)
    })
  }

  static setChain(sendResponse, newNetType) {
    Background.load(bytom => {
      const currentNet = bytom.settings.netType

      if( newNetType !== currentNet){
        bytom.settings.netType = newNetType;
        this.update(() => sendResponse({status:'success'}), bytom);
      }else{
        sendResponse(Error.duplicate(newNetType));
      }
    })
  }

  static authenticate(sendResponse, payload){
    Background.load(bytom => {
      const {domain,  ...domainAttrs} = payload;

      const currentAccount =  bytom.currentAccount

      if(!currentAccount){
        sendResponse(Error.signatureAccountMissing())
      }else{

        const {vpAddress, address} = currentAccount
        let account = {
          addresses: [vpAddress, address],
          rootXPub: currentAccount.xpub
        }
        if(bytom.settings.netType === 'vapor'){
          account.address = vpAddress;
        }else{
          account.address = address;
        }


        if(bytom.settings.domains.find(_domain => _domain === domain)) {
          sendResponse(account);
        } else{
          NotificationService.open(new Prompt(PromptTypes.REQUEST_AUTH, payload.domain, payload, approved => {
            if(approved === false || approved.hasOwnProperty('isError')) sendResponse(approved);
            else {
              bytom.settings.domains.unshift(domain);
              bytom.settings.domainsMeta[domain] = domainAttrs;

              if(approved === true){
                this.update(() => sendResponse(account), bytom);
              }else{
                this.update(() => sendResponse(approved), bytom);
              }
            }
          }));
        }
      }
    })
  }

  static disauthenticate(sendResponse, payload){
    Background.load(bytom => {
      const domain = payload.domain;

      var index = bytom.settings.domains.indexOf(domain);
      if(index !== -1) {
        payload.type = 'dis'
        NotificationService.open(new Prompt(PromptTypes.REQUEST_AUTH, payload.domain, payload, approved => {
          if(approved === false || approved.hasOwnProperty('isError')) sendResponse(approved);
          else {
            bytom.settings.domains.splice(index, 1);
            delete bytom.settings.domainsMeta[domain];

            if(approved === true){
              this.update(() => sendResponse({status:'success'}), bytom);
            }else{
              this.update(() => sendResponse(approved), bytom);
            }
          }
        }));
      } else{
        sendResponse(Error.disauth());
      }
    })
  }


}

window.setLockTime = (time) => lockTime = time || Date.now();
window.getLockTime = () => lockTime;

new Background()
