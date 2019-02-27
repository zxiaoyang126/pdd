// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import LyTab from 'ly-tab'
import store from './store'
import './../mock/mock.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

//引入字体图标
import '@/common/css/style.css'


Vue.use(LyTab)

Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
