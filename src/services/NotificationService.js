import Error from '../utils/errors/Error'
import {apis} from '../utils/BrowserApis';
import InternalMessage from '../messages/internal'
import * as InternalMessageTypes from '../messages/types'

let openWindow = null;

export default class NotificationService {

    /***
     * Opens a prompt window outside of the extension
     * @param notification
     */
    static async open(notification){
        if(openWindow){
            // For now we're just going to close the window to get rid of the error
            // that is caused by already open windows swallowing all further requests
            openWindow.close();
            openWindow = null;

            // Alternatively we could focus the old window, but this would cause
            // urgent 1-time messages to be lost, such as after dying in a game and
            // uploading a high-score. That message will be lost.
            // openWindow.focus();
            // return false;

            // A third option would be to add a queue, but this could cause
            // virus-like behavior as apps overflow the queue causing the user
            // to have to quit the browser to regain control.
        }


        const height = 623;
        const width = 420;
        let middleX = window.screen.availWidth/2 - (width/2);
        let middleY = window.screen.availHeight/2 - (height/2);

        const getPopup = async () => {
            try {
                const url = `${apis.runtime.getURL('pages/prompt.html')}#${notification.routeName()}`;

                // Notifications get bound differently depending on browser
                // as Firefox does not support opening windows from background.
                if(typeof chrome !== 'undefined') {
                    window.notification = notification;
                    apis.windows.create({
                        url,
                        height,
                        width,
                        type:'popup'
                    },(_window) => {
                        apis.windows.onRemoved.addListener(function(windowId){
                          if(windowId === _window.id) {
                            notification.responder(Error.promptClosedWithoutAction());
                            return false;
                          }
                        });
                      return _window;
                      });
                }
                else {
                    const win = window.open(url, 'BytomPrompt', `width=${width},height=${height},resizable=0,top=${middleY},left=${middleX},titlebar=0`);
                    win.data = notification;
                    openWindow = win;
                    return win;
                }
            } catch (e) {
                console.log('notification error', e);
                return null;
            }
        }

        await InternalMessage.payload(InternalMessageTypes.SET_PROMPT, JSON.stringify(notification)).send();

        let popup = await getPopup();

        if(popup){
          popup.onbeforeunload = () => {
              notification.responder(Error.promptClosedWithoutAction());

              // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
              // Must return undefined to bypass form protection
              openWindow = null;
              return undefined;
          };
        }
    }

    /***
     * Always use this method for closing notification popups.
     * Otherwise you will double send responses and one will always be null.
     */
    static async close(){
        if(typeof browser !== 'undefined') {
            const {id: windowId,} = (await apis.windows.getCurrent());
            apis.windows.remove(windowId);
        } else {
            window.onbeforeunload = () => {};
            window.close();
        }
    }

}
