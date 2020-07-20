import BackButton from "./button"

const backButtonInstance = {
  install: function (Vue, options) {
    Vue.component('BackButton', BackButton);
  },
};

export default backButtonInstance;
