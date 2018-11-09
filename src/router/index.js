import Vue from 'vue'
import Router from 'vue-router'
import pmSearchMainPage from '@/pmSearchMainPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'pmSearchMainPage',
      component: pmSearchMainPage
    }
  ]
})
