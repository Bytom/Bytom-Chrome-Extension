import MenuPage from "./page"

const menuPageInstance = {
  install: function (Vue, options) {
    Vue.component('MenuPage', MenuPage);
  },
};

export default menuPageInstance;