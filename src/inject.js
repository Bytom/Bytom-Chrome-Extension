import IdGenerator from '@/utils/IdGenerator'
import { EncryptedStream } from 'extension-streams'
import * as MsgTypes from './messages/types'
import * as EventNames from '@/messages/event'
import Bytomdapp from './dapp'

/***
 * This is the javascript which gets injected into
 * the application and facilitates communication between
 * bytom chrome extension and the web application.
 */
class Inject {
  constructor() {
    // Injecting an encrypted stream into the web application.
    const stream = new EncryptedStream(EventNames.INJECT, IdGenerator.text(64))

    // Waiting for bytomExtension to push itself onto the application
    stream.listenWith(msg => {
      console.log('inject.stream.listen:', msg)
      if (
        msg &&
        msg.hasOwnProperty('type') &&
        msg.type === MsgTypes.PUSH_BYTOM
      ) {
        window.bytom = new Bytomdapp(stream, msg.payload)
      }
    })

    // Syncing the streams between the extension and the web application
    stream.sync(EventNames.BYTOM, stream.key)
  }
}

new Inject()
