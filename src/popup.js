import App from './app'

class Popup {
  constructor() {
    if (localStorage.login == undefined) {
      App.welcome()
      return
    }

    App.launth()
  }
}

const popup = new Popup()
