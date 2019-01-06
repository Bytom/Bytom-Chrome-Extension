import { LocalStream } from 'extension-streams'
import InternalMessage from '@/messages/internal'
import * as MsgTypes from './messages/types'

export default class Background {
  constructor() {
    this.setupInternalMessaging()
  }

  setupInternalMessaging() {
    console.log('messaging')
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
}

new Background()
