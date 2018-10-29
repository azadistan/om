import Vue from 'vue'
import Router from 'vue-router'
import omMainPage from '@/omMainPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'omMainPage',
      component: omMainPage
    }
  ]
})
