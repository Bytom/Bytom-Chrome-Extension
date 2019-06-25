import { LocalStream } from 'extension-streams'
import InternalMessage from '@/messages/internal'
import * as MsgTypes from './messages/types'
import NotificationService from './services/NotificationService'
import StorageService from './services/StorageService'
import Prompt from './prompts/Prompt';
import * as PromptTypes from './prompts/PromptTypes'

import Error from './utils/errors/Error'
import accountAction from "@/models/account";
import bytom from "@/models/bytom";

let prompt = null;

export default class Background {
  constructor() {
    this.setupInternalMessaging()
    this.setupBytom()
  }

  setupBytom(){
    const network = localStorage.bytomNet||'mainnet'
    bytom.setupNet(network)

    window.addEventListener('storage', storageEventHandler, false);
    function storageEventHandler(evt){
      if(evt.key === 'bytomNet'){
        bytom.setupNet( evt.newValue )
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, {action: "updateNetAndAccounts"}, function(response) {});
        });
      }else if(evt.key === 'currentAccount'){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, {action: "updateAccount"}, function(response) {});
        });
      }
    }
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
      case MsgTypes.TRANSFER:
        this.transfer(sendResponse, message.payload)
        break
      case MsgTypes.ADVTRANSFER:
        this.advancedTransfer(sendResponse, message.payload)
        break
      case MsgTypes.SEND:
        this.send(sendResponse, message.payload)
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
      case MsgTypes.ENABLE:
        Background.authenticate(sendResponse, message.payload)
        break
      case MsgTypes.SET_PROMPT:
        Background.setPrompt(sendResponse, message.payload);
        break;
      case MsgTypes.GET_PROMPT:
        Background.getPrompt(sendResponse);
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
    if(payload.address === undefined){
      sendResponse(Error.typeMissed('address'));
      return false;
    }
    if(payload.message === undefined){
      sendResponse(Error.typeMissed('message'));
      return false;
    }

    NotificationService.open(new Prompt(PromptTypes.REQUEST_SIGN, '', payload ,approved => {
     sendResponse(approved);
    }));
  }

  transfer(sendResponse, payload) {
    var promptURL = chrome.extension.getURL('pages/prompt.html')
    var requestBody = payload
    requestBody.type = "popup"
    var queryString = new URLSearchParams(requestBody).toString()
    console.log(promptURL, queryString)

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
    if(requestBody.amount === undefined){
      sendResponse(Error.typeMissed('amount'));
      return false;
    }


      chrome.windows.create(
      {
        url: `${promptURL}#transfer?${queryString}`,
        type: 'popup',
        width: 360,
        height: 623,
        top: 0,
        left: 0
      },
      (window) => {
        chrome.runtime.onMessage.addListener(function(request, sender) {
          if(sender.tab.windowId === window.id){
            switch (request.method){
              case 'transfer':
                if (request.action === 'success'){
                  sendResponse(request.message);
                  return true;
                } else if (request.action === 'reject'){
                  sendResponse(request.message);
                  return false;
                }
            }
          }
        });

        chrome.windows.onRemoved.addListener(function(windowId){
          if(windowId === window.id) {
            sendResponse(Error.promptClosedWithoutAction());
            return false;
          }
        });
      }
    )
  }

  advancedTransfer(sendResponse, payload) {

    if(payload.input === undefined){
      sendResponse(Error.typeMissed('input'));
      return false;
    }
    if(payload.output === undefined){
      sendResponse(Error.typeMissed('output'));
      return false;
    }
    if(payload.gas === undefined){
      sendResponse(Error.typeMissed('gas'));
      return false;
    }

    NotificationService.open(new Prompt(PromptTypes.REQUEST_ADVANCED_TRANSFER, '', payload ,approved => {
      sendResponse(approved);
    }));

  }

  requestCurrentAccount(sendResponse, payload){
    Background.load(bytom => {
      const domain = payload.domain;
      if(bytom.settings.domains.find(_domain => _domain === domain)) {
        const currentAccount = JSON.parse(localStorage.currentAccount)
        delete(currentAccount['label'])
        delete(currentAccount['net'])
        currentAccount['accountId'] = currentAccount['guid']
        delete(currentAccount['guid'])
        delete(currentAccount['balance'])

        sendResponse(currentAccount);
      } else{
        sendResponse(null);
        return false;
      }
    })

  }

  requestCurrentNetwork(sendResponse){
    sendResponse(localStorage.bytomNet)
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
    StorageService.get().then(bytom => {
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

  static authenticate(sendResponse, payload){
    Background.load(bytom => {
      const domain = payload.domain;
      const currentAccount = JSON.parse(localStorage.currentAccount)
      delete(currentAccount['label'])
      delete(currentAccount['net'])
      currentAccount['accountId'] = currentAccount['guid']
      delete(currentAccount['guid'])
      delete(currentAccount['balance'])

      if(bytom.settings.domains.find(_domain => _domain === domain)) {
        sendResponse(currentAccount);
      } else{
        NotificationService.open(new Prompt(PromptTypes.REQUEST_AUTH, payload.domain, {}, approved => {
          if(approved === false || approved.hasOwnProperty('isError')) sendResponse(approved);
          else {
            bytom.settings.domains.unshift(domain);
            if(approved === true){
              this.update(() => sendResponse(currentAccount), bytom);
            }else{
              this.update(() => sendResponse(approved), bytom);
            }
          }
        }));
      }
    })
  }


}

new Background()
