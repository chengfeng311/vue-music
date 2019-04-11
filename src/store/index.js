import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import states from './states'
import mutations from './mutations'
import getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  states,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
