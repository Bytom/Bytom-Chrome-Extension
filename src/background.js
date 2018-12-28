import { LocalStream } from 'extension-streams'

export default class Background {
  constructor() {
    this.setupInternalMessaging()
  }

  setupInternalMessaging() {
    LocalStream.watch((request, sendResponse) => {
      console.log(request)
      // const message = InternalMessage.fromJson(request)
      // this.dispatchMessage(sendResponse, message)
    })
  }

  dispatchMessage(sendResponse, message) {
    switch (message.type) {
      case InternalMessageTypes.SET_SEED:
        // Background.setSeed(sendResponse, message.payload)
        break
    }
  }

  static transfer(sendResponse) {
    var optionsUrl = chrome.extension.getURL('pages/prompt.html')
    console.log(optionsUrl)
    chrome.tabs.query({ url: optionsUrl }, tabs => {
      console.log(22, tabs)
      chrome.windows.create(
        { url: optionsUrl, type: 'popup', width: 350, height: 625, left: 0 },
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
