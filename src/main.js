// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import echarts from 'echarts'
import axios from 'axios'
import 'leaflet/dist/leaflet.css';

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Vuetify)

const store = new Vuex.Store({
  state: {
    listNum:0
  },
  mutations: {
    listNumChange(state,n){
      switch (n) {
        case 1:
          state.listNum = 1
          break;
        case 2:
          state.listNum = 2
          break;
        case 3:
          state.listNum = 3
          break;
        case 4:
          state.listNum = 4
          break;
        default:
          state.listNum = 5
          break;
      }
    }
  }
})
/* eslint-disable no-new */


/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
