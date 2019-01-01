import IdGenerator from '@/utils/IdGenerator'
import { EncryptedStream } from 'extension-streams'
// import * as PairingTags from './messages/PairingTags'
// import * as NetworkMessageTypes from './messages/NetworkMessageTypes'

/***
 * This is the javascript which gets injected into
 * the application and facilitates communication between
 * bytom chrome extension and the web application.
 */
class Inject {
  constructor() {
    // Injecting an encrypted stream into the web application.
    const stream = new EncryptedStream('inject', IdGenerator.text(64))

    // Waiting for bytomExtension to push itself onto the application
    stream.listenWith(msg => {
      console.log(1111, msg)
      if (msg && msg.hasOwnProperty('type') && msg.type === 'scatter') {
      }
      // window.scatter = new Scatterdapp(stream, msg.payload)
    })

    // Syncing the streams between the extension and the web application
    stream.sync('bytom', stream.key)
  }
}

const inject = new Inject()
