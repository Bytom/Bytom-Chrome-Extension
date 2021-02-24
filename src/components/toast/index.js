import Api from './js/api.js';
import Vue from 'vue';
import Toast from './js/Component.vue';

export let toast
const toastInstance = {
  i18n: null,
  install: function (Vue, options) {
    Vue.component('v-toast', Toast);
    let methods = Api(Vue, options);
    Vue.$toast = methods;
    toast = methods;
    Vue.prototype.$toast = methods;
    this.i18n = options;
  },
};

export default toastInstance;
