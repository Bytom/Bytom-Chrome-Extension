import { EncryptedStream, LocalStream } from 'extension-streams'

class Content {
  constructor() {
    this.setupInjectScript()
    this.setupEncryptedStream()
  }

  setupInjectScript() {
    const content = chrome.extension.getURL('js/content.js')
    let script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', content)
    document.body.appendChild(script)
  }

  setupEncryptedStream() {
    // stream = new EncryptedStream('bytom', IdGenerator.text(256))
    // stream.listenWith(msg => this.contentListener(msg))
  }

  contentListener(msg) {
    console.log('event.data', msg)
  }
}

const content = new Content()
