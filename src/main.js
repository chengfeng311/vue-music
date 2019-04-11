import 'common/stylus/index.styl'
import 'babel-polyfill'
import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'

const loadingImg = require('common/image/default.png')

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(VueLazyload, {
  loading: loadingImg,
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
