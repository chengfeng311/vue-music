import 'common/stylus/index.styl'
import 'babel-polyfill'
import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
import Vue from 'vue'
import App from './App'
import router from './router/index'

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'common/image/default.png',
  loading: 'common/image/default.png',
  attempt: 1,
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
