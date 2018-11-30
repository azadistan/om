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
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw/dist/leaflet.draw.js'
import '@turf/turf/turf.js';
import '@turf/turf/index.js';


Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Vuetify)

const store = new Vuex.Store({
  state: {
    //目标地理范围相关
    listNum:0,
    centerData:[],
    coordinateData:[1,2,3,4],
    zoomData:6,
    circleData:[[35,104],100],
    polygonData:[],
    viewSet:[[0,0],0],
    geoJsonNow:'', //国内省份改变的geojson
    sendJson:'',//还是国内省份改变的geojson，可能有问题
    mapReset:0,
    drawAreaId:0,
    dialog:[false,''],

    //专题产品相关
    speGeoJsonSelect:'', //专题查询选择geojson
    speResultsNow:[],//专题产品查询结果
    productTypeNow:2,//切换标准、高级、专题产品查询栏变量
    productResultNow:2,//切换标准、高级、专题产品结果栏变量
    speDescriptionNow:'',//专题产品专题描述
    productObjectNow:'',//专题产品生产人员
    serviceObjectNow:'',//专题产品服务对象
    selectIndustry:'',
    selectNong:'',
    selectLin:'',
    selectShui:'',
    selectHai:'',
    selectSheng:'',
    selectGuo:'',
    selectJiao:'',
    selectDian:'',
    selectZhu:'',
    selectCheng:'',
    selectZi:'',
    selectDi:'',
    selectYe:'',
    selectShi:'',
    selectQi:'',
    spePageTotalNow:0,
    spePageNow:1,

    //高级产品全部查询条件
    orthoProduct:false,
    inlayProduct:false,
    subdivisionProduct:false,
    advProducePerson:'',
    advProductName:'',
    advProduceAddress:'',
    advDataDelivery:'',
    advDataDeliveryObject:'',
    advProduceStartTime:'',
    advProduceEndTime:'',
    advDeliveryStartTime:'',
    advDeliveryEndTime:'',
    advResultsNow:[],
    advGeoJsonSelect:[],//用户选择高级产品GEOJSON
    advUrlAndJsonNow:[],//用户选择的缩略图Url及json
    advPageTotalNow:0,
    advPageNow:1,
  },
  mutations: {
    //目标地理范围相关
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
    },
    centerDataChange(state,n){
      state.centerData=n
    },
    coordinateDataChange(state,n){
      state.coordinateData=n
    },
    zoomDataChange(state,n){
      state.zoomData = n
    },
    circleDataChange(state,n){
      state.circleData = n
    },
    polygonDataChange(state,n){
      state.polygonData = n
    },
    viewSetChange(state,n){
      state.viewSet = n
    },
    geoJsonChange(state,n){
      state.geoJsonNow = n
    },
    sendJsonChange(state,n){
      state.sendJson = n
    },
    productTypeChange(state,n){
      state.productTypeNow = n
    },
    productResultChange(state,n){
      state.productResultNow = n
    },
    mapResetChange(state,n){
      state.mapReset = n
    },
    drawAreaChange(state,n){
      state.drawAreaId = n
    },
    dialogChange(state,n){
      state.dialog = n
    },

    //专题产品查询相关
    speResultsChange(state,n){
      state.speResultsNow = n
    },
    speDescriptionChange(state,n){
      state.speDescriptionNow = n
    },
    selectIndustryChange(state,n){
      state.selectIndustry = n
    },
    selectNongChange(state,n){
      state.selectNong = n
    },
    selectLinChange(state,n){
      state.selectLin = n
    },
    selectShuiChange(state,n){
      state.selectShui = n
    },
    selectHaiChange(state,n){
      state.selectHai = n
    },
    selectShengChange(state,n){
      state.selectSheng = n
    },
    selectGuoChange(state,n){
      state.selectGuo = n
    },
    selectJiaoChange(state,n){
      state.selectJiao = n
    },
    selectDianChange(state,n){
      state.selectDian = n
    },
    selectZhuChange(state,n){
      state.selectZhu = n
    },
    selectChengChange(state,n){
      state.selectCheng = n
    },
    selectZiChange(state,n){
      state.selectZi = n
    },
    selectDiChange(state,n){
      state.selectDi = n
    },
    selectYeChange(state,n){
      state.selectYe = n
    },
    selectShiChange(state,n){
      state.selectShi = n
    },
    selectQiChange(state,n){
      state.selectQi = n
    },
    productObjectChange(state,n){
      state.productObjectNow = n
    },
    serviceObjectChange(state,n){
      state.serviceObjectNow = n
    },
    speGeoJsonSelectChange(state,n){
      state.speGeoJsonSelect = n
    },
    spePageTotalChange(state,n){
      state.spePageTotalNow = n
    },
    spePageChange(state,n){
      state.spePageNow = n
    },


    //高级产品查询条件
    orthoProductChange(state,n){
      state.orthoProduct = n
    },
    inlayProductChange(state,n){
      state.inlayProduct = n
    },
    subdivisionProductChange(state,n){
      state.subdivisionProduct = n
    },
    advProducePersonChange(state,n){
      state.advProducePerson = n
    },
    advProductNameChange(state,n){
      state.advProductName = n
    },
    advProduceAddressChange(state,n){
      state.advProduceAddress = n
    },
    advDataDeliveryChange(state,n){
      state.advDataDelivery = n
    },
    advDataDeliveryObjectChange(state,n){
      state.advDataDeliveryObject = n
    },
    advProduceStartTimeChange(state,n){
      state.advProduceStartTime = n
    },
    advProduceEndTimeChange(state,n){
      state.advProduceEndTime = n
    },
    advDeliveryStartTimeChange(state,n){
      state.advDeliveryStartTime = n
    },
    advDeliveryEndTimeChange(state,n){
      state.advDeliveryEndTime = n
    },
    advResultsChange(state,n){
      state.advResultsNow = n
    },
    advGeoJsonSelectChange(state,n){
      state.advGeoJsonSelect = n
    },
    advUrlAndJsonChange(state,n){
      state.advUrlAndJsonNow = n
    },
    advPageTotalChange(state,n){
      state.advPageTotalNow = n
    },
    advPageChange(state,n){
      state.advPageNow = n
    },
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
