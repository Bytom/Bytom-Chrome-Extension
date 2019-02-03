import { LocalStream } from 'extension-streams'
import InternalMessage from '@/messages/internal'
import * as MsgTypes from './messages/types'

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
    }
  }

  transfer(sendResponse, payload) {
    var promptURL = chrome.extension.getURL('pages/prompt.html')
    var queryString = new URLSearchParams(payload).toString()
    console.log(promptURL, queryString)
    chrome.windows.create(
      {
        url: `${promptURL}#transfer?${queryString}`,
        type: 'popup',
        width: 350,
        height: 623,
        top: 0,
        left: 0
      },
      () => {
        sendResponse(true)
      }
    )
  }

  advancedTransfer(sendResponse, payload) {
    var promptURL = chrome.extension.getURL('pages/prompt.html')
    var queryString = 'object='+JSON.stringify(payload)
    console.log(promptURL, queryString)
    chrome.windows.create(
      {
        url: `${promptURL}#advancedTransfer?${queryString}`,
        type: 'popup',
        width: 350,
        height: 623,
        top: 0,
        left: 0
      },
      (window) => {
        chrome.runtime.onMessage.addListener(function(request, sender) {
          if(sender.tab.windowId === window.id){
            switch (request.method){
              case 'advanced-transfer':
                sendResponse(request);
                break
            }
          }
        });
      }
    )
  }

  send(sendResponse, payload) {
    const action = payload.action
    const body = payload.body
    if(action){
      let promise
      switch (action){
        case 'listAllAccount':
          promise = accountAction.list()
          break
        case 'currentAccount':
          let account = JSON.parse(localStorage.currentAccount)
          sendResponse(account)
          break
        case 'balance':
          const id = body.id
          const guid = body.guid
          promise = accountAction.balance(guid, id)
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
