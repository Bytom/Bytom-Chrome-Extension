import Header from "./header"

const HeaderInstance = {
  install: function (Vue, options) {
    Vue.component('Header',  Header)
  },
};

export default HeaderInstance;
