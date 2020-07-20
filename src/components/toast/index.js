import Api from './js/api.js';
import Vue from 'vue';
import toast from './js/Component.vue';

const toastInstance = {
  i18n: null,
  install: function (Vue, options) {
    Vue.component('v-toast', toast);
    let methods = Api(Vue, options);
    Vue.$toast = methods;
    Vue.prototype.$toast = methods;
    this.i18n = options;
  },
};

export default toastInstance;
