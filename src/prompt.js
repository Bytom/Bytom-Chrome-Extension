import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import Routers from './router'
import ViewBase from '@/views/viewBase'
import Dialog from '@/components/dialog'
import vSelect from '@/components/select'
import messages, { have } from '@/assets/language'
import '@/assets/style.css'

Vue.use(VueI18n)
const i18n = new VueI18n({
  fallbackLocale: 'en',
  locale: have(localStorage.lang) ? localStorage.lang : 'cn',
  messages
})
Vue.use(i18n)
Vue.use(VueRouter)
Vue.use(Loading)
Vue.use(Dialog, i18n)
Vue.component('v-select', vSelect)

const RouterConfig = {
  routes: Routers
}
const router = new VueRouter(RouterConfig)

new Vue({
  el: '#app',
  i18n: i18n,
  router: router,
  render: h => h(ViewBase)
})
