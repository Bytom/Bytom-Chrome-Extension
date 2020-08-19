import { LocalStream } from 'extension-streams'
import InternalMessage from '@/messages/internal'
import * as MsgTypes from './messages/types'
import NotificationService from './services/NotificationService'
import StorageService from './services/StorageService'
import Prompt from './prompts/Prompt';
import * as PromptTypes from './prompts/PromptTypes'

import _ from 'lodash'
import Error from './utils/errors/Error'
import { BTM, camelize } from './utils/constants'

let prompt = null;

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
    if(payload.address === undefined){
      sendResponse(Error.typeMissed('address'));
      return false;
    }
    if(payload.message === undefined){
      sendResponse(Error.typeMissed('message'));
      return false;
    }

    NotificationService.open(new Prompt(PromptTypes.REQUEST_SIGN, '', payload ,approved => {
     sendResponse(camelize(approved));
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

    // NotificationService.open(new Prompt(PromptTypes.REQUEST_TRANSFER, '', payload ,approved => {
    //   sendResponse(approved);
    // }));

      chrome.windows.create(
      {
        url: `${promptURL}#transfer?${queryString}`,
        type: 'popup',
        width: 420,
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
                  sendResponse(camelize(request.message));
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
      sendResponse(camelize(approved));
    }));

  }

  signTransaction(sendResponse, payload) {
    NotificationService.open(new Prompt(PromptTypes.REQUEST_SIGN_TRANSACTION, '', payload ,approved => {
      sendResponse(camelize(approved));
    }));
  }

  requestCurrentAccount(sendResponse, payload){
    Background.load(bytom => {
      const domain = payload.domain;
      if(bytom.settings.domains.find(_domain => _domain === domain)) {
        const currentAccount =  bytom.currentAccount
        let account
        if(bytom.settings.netType === 'vapor'){
          account = {
            address: currentAccount.vpAddress,
          };
        }else{
          account ={
            address: currentAccount.address,
          };
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
      const domain = payload.domain;
      const currentAccount =  bytom.currentAccount

      if(!currentAccount){
        sendResponse(Error.signatureAccountMissing())
      }else{
        let account
        if(bytom.settings.netType === 'vapor'){
          let vote = 0
          const votes = currentAccount.votes
          if(votes && votes.length >0 ){
            vote = _.sumBy(votes,'total')
          }

          let balances = currentAccount.vpBalances ||[]
          balances = balances.map(({ inBtc, inCny, inUsd, name, ...keepAttrs}) => {
            if(keepAttrs.asset === BTM)
              return {availableBalance: (keepAttrs.balance-vote),...keepAttrs}
            else
              return keepAttrs
          })

          account ={
            address: currentAccount.vpAddress,
            alias:currentAccount.alias,
            balances: balances || [],
            accountId: currentAccount.guid,
            rootXPub: currentAccount.rootXPub
          };

        }else{
          let balances = currentAccount.balances ||[]
          balances = balances.map(({ inBtc, inCny, inUsd, name, ...keepAttrs}) => keepAttrs)

          account ={
            address: currentAccount.address,
            alias:currentAccount.alias,
            balances: balances|| [],
            accountId: currentAccount.guid,
            rootXPub: currentAccount.rootXPub
          };
        }

        if(bytom.settings.domains.find(_domain => _domain === domain)) {
          sendResponse(account);
        } else{
          NotificationService.open(new Prompt(PromptTypes.REQUEST_AUTH, payload.domain, {}, approved => {
            if(approved === false || approved.hasOwnProperty('isError')) sendResponse(approved);
            else {
              bytom.settings.domains.unshift(domain);
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
        NotificationService.open(new Prompt(PromptTypes.REQUEST_AUTH, payload.domain, {type:'dis'}, approved => {
          if(approved === false || approved.hasOwnProperty('isError')) sendResponse(approved);
          else {
            bytom.settings.domains.splice(index, 1);
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

new Background()
