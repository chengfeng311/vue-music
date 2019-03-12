import Vue from 'vue'
import Router from 'vue-router'
import recommand from 'components/recommand/recommand'
import singer from 'components/singer/singer'
import rank from 'components/rank/rank'
import search from 'components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommand',
      component: recommand,
    },
    {
      path: '/recommand',
      component: recommand,
    },
    {
      path: '/singer',
      component: singer,
    },
    {
      path: '/rank',
      component: rank,
    },
    {
      path: '/search',
      component: search,
    },
  ],
})
