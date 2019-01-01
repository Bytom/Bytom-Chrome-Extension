import { LocalStream } from 'extension-streams'
import InternalMessage from '@/messages/internal'

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
      case 'auth':
        this.transfer()
        break
    }
  }

  transfer(sendResponse) {
    var promptURL = chrome.extension.getURL('pages/prompt.html')
    console.log(promptURL)
    chrome.tabs.query({ url: promptURL }, tabs => {
      console.log(22, tabs)
      chrome.windows.create(
        {
          url: `${promptURL}#transfer`,
          type: 'popup',
          width: 350,
          height: 625,
          left: 0
        },
        () => {
          chrome.extension.sendMessage(
            { cmd: '来自前台页面的主动调用' },
            function(response) {
              console.log(123, response)
            }
          ) //测试前台掉后台
        }
      )
    })
  }
}

const background = new Background()
