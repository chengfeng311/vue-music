import 'common/stylus/index.styl'
import 'babel-polyfill'
import 'swiper/dist/css/swiper.css'
import Vue from 'vue'
import App from './App'
import router from './router/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
