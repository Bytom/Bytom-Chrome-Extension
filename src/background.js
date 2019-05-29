import { LocalStream } from 'extension-streams'
import InternalMessage from '@/messages/internal'
import * as MsgTypes from './messages/types'

import Error from './utils/errors/Error'
import accountAction from "@/models/account";
import bytom from "@/models/bytom";

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
        this.requestCurrentAccount(sendResponse)
        break
      case MsgTypes.REQUEST_CURRENT_NETWORK:
        this.requestCurrentNetwork(sendResponse)
        break
      case MsgTypes.REQUEST_ACCOUNT_LIST:
        this.requestAccountList(sendResponse)
        break
    }
  }

  signMessage(sendResponse, payload) {
    var promptURL = chrome.extension.getURL('pages/prompt.html')
    var requestBody = payload
    var queryString = new URLSearchParams(requestBody).toString()
    console.log(promptURL, queryString)

    if(requestBody.address === undefined){
      sendResponse(Error.typeMissed('address'));
      return false;
    }
    if(requestBody.message === undefined){
      sendResponse(Error.typeMissed('message'));
      return false;
    }

    chrome.windows.create(
      {
        url: `${promptURL}#signMessage?${queryString}`,
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
              case 'sign-message':
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
                  sendResponse(request.message.result.data);
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
    var promptURL = chrome.extension.getURL('pages/prompt.html')
    var queryString = 'object='+JSON.stringify(payload)
    console.log(promptURL, queryString)

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

    chrome.windows.create(
      {
        url: `${promptURL}#advancedTransfer?${queryString}`,
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
              case 'advanced-transfer':
                if (request.action === 'success'){
                  sendResponse(request.message.result.data);
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

  requestCurrentAccount(sendResponse){
    const currentAccount = JSON.parse(localStorage.currentAccount)
    delete(currentAccount['label'])
    delete(currentAccount['net'])
    currentAccount['accountId'] = currentAccount['guid']
    delete(currentAccount['guid'])
    delete(currentAccount['balance'])

    sendResponse(currentAccount)
  }

  requestCurrentNetwork(sendResponse){
    sendResponse(localStorage.bytomNet)
  }

  requestAccountList(sendResponse){
    accountAction.list().then(resp=>{
      const accountList = resp
      accountList.forEach(function(account) {
        delete(account['label'])
        delete(account['net'])
        account['accountId'] = account['guid']
        delete(account['guid'])
        delete(account['balance'])
      })
      sendResponse(accountList)
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
}

new Background()
