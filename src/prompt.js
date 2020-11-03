import './ga.js'
import Vue from 'vue'
import moment from 'moment'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import InfiniteLoading from 'vue-infinite-loading';

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
import {apis} from '@/utils/BrowserApis';

import account from "@/models/account";
import {getDomains} from '@/utils/utils.js'
import _ from 'lodash'
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from '@sentry/tracing';
import BytomObj from "./utils/Bytom";

store.dispatch(Actions.LOAD_BYTOM).then(() => {
  Vue.use(VueI18n)
  const i18n = new VueI18n({
    fallbackLocale: 'en',
    locale: getLanguage(store.getters.language),
    messages
  })
  Vue.use(Vuelidate)
  Vue.use(InfiniteLoading)
  Vue.use(i18n)
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

  apis.storage.onChanged.addListener(function(changes, namespace) {
    for (let key in changes) {
      if(key === 'bytom'){
        const newNetwork = changes[key].newValue.settings.network
        if(newNetwork !== changes[key].oldValue.settings.network){
          account.setupNet(`${newNetwork}${store.getters.netType}`)
        }

        store.dispatch(Actions.LOAD_BYTOM)
      }
    }
  });

  Sentry.init({
    dsn: "https://f080e90fe9d94cf9b05323b373d839f3@o441881.ingest.sentry.io/5412722",
    release: "byone@" + process.env.npm_package_version,
    integrations: [
      new VueIntegration({
        Vue,
        tracing: true
      }),
      new Integrations.BrowserTracing()
    ],
    tracesSampleRate: 1
  });

  Sentry.configureScope(function(scope) {
    scope.setUser({ id: store.getters.clientId });
  });

  account.setupNet(`${store.getters.net}${store.getters.netType}`)

  store.watch(
    (state, getters) => getters.netType,
    (newValue, oldValue) => {
      if(newValue !== oldValue){
        account.setupNet(`${store.getters.net}${store.getters.netType}`)
      }
    },
  );

  getDomains().then(({domains, domainMeta})=>{
    const _bytom = store.state.bytom.clone()

    if(!domains.every(v => _bytom.settings.domains.includes(v)) || _.isEmpty(_bytom.settings.domainsMeta)){
        _bytom.settings.domains = Array.from(new Set(_bytom.settings.domains.concat(domains)))
        _bytom.settings.domainsMeta = Object.assign(_bytom.settings.domainsMeta, domainMeta)
        store.dispatch(Actions.UPDATE_STORED_BYTOM, _bytom)
      }
  })

  Vue.filter('moment', function(value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
    return moment(value * 1000).format(formatString)
  })

  const RouterConfig = {
    routes: Routers
  }
  const router = new VueRouter(RouterConfig)
  router.beforeEach((to, from, next) => {
    // wallet init

    if (!(store.getters.currentAccount) && to.name == 'home') {
      next({ name: 'welcome' })
      let newURL = `${apis.runtime.getURL('pages/prompt.html')}#/welcome`;
      chrome.tabs.create({ url: newURL });
      return
    }else if (!(store.getters.currentAccount && store.getters.vMnemonic)  && to.name == 'home') {
      next({ name: 'welcome-verify-mnemonic' })
      let newURL = `${apis.runtime.getURL('pages/prompt.html')}#/mnemonic`;
      chrome.tabs.create({ url: newURL });
      return
    }

    next()
  })
  new Vue({
    el: '#app',
    i18n: i18n,
    router: router,
    store,
    render: h => h(ViewBase)
  })
});

