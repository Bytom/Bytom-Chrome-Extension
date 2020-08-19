import Vue from 'vue'
import moment from 'moment'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import Loading from 'vue-loading-overlay'
import vuescroll from 'vuescroll/dist/vuescroll-native'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'vuescroll/dist/vuescroll.css'

import {store} from './store/store'
import * as Actions from './store/constants'
import Routers from './router'
import ViewBase from '@/views/viewBase'
import Dialog from '@/components/dialog'
import Header from '@/components/header'
import Footer from '@/components/footer'
import vSelect from '@/components/select'
import SelectionPage from '@/components/selection-page'
import BackButton from '@/components/backButton'
import Success from '@/components/Success.vue'
import Menubar from '@/components/MenubarComponent.vue'
import ModalPasswd from '@/components/modal-passwd.vue'
import Toast from '@/components/toast'
import messages, { getLanguage } from '@/assets/language'
import '@/assets/style.css'
import Vuelidate from "vuelidate";

store.dispatch(Actions.LOAD_BYTOM).then(() => {
  Vue.use(VueI18n)
  const i18n = new VueI18n({
    fallbackLocale: 'en',
    locale: getLanguage(store.getters.language),
    messages
  })
  Vue.use(Vuelidate)
  Vue.use(i18n)
  Vue.use(vuescroll)
  Vue.use(VueRouter)
  Vue.use(SelectionPage)
  Vue.use(Header)
  Vue.use(Footer)
  Vue.use(Loading)
  Vue.use(BackButton)
  Vue.use(Dialog, i18n)
  Vue.use(Toast, i18n)
  Vue.component('success', Success)
  Vue.component('menu-bar', Menubar)
  Vue.component('v-select', vSelect)
  Vue.component('modal-passwd', ModalPasswd)


  Vue.filter('moment', function(value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
    return moment(value * 1000).format(formatString)
  })
  Vue.prototype.$vuescrollConfig = {
    mode: 'native',
    sizeStrategy: 'percent',
    detectResize: true,
    bar: {
      keepShow: true,
      background: '#c9c9c9'
    }
  }

  const RouterConfig = {
    routes: Routers
  }
  const router = new VueRouter(RouterConfig)
  new Vue({
    el: '#app',
    i18n: i18n,
    router: router,
    store,
    render: h => h(ViewBase)
  })
});

