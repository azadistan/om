<template>
  <div class="vue-leaflet">
    <l-map style="width: 100%; height: 100%;position: fixed;bottom: 0;" :zoom="zoom" :center="center">
      <l-tile-layer v-for="tileProvider in tileProviders"
                    layerType="base" :name="tileProvider.name" :visible="tileProvider.visible"
                    :url="tileProvider.url" :options="tileProvider.subdomains" :token="token"/>
      <l-marker :lat-lng="marker">
        <l-popup :content="text"></l-popup>
      </l-marker>
    </l-map>
    <div v-show="pmSearchContentshow" class="elevation-2" style="width:30.25rem;position:absolute;background-color: white;">
          <pm-search-range></pm-search-range>
          <pm-search-condition></pm-search-condition>
      <v-btn block :loading="loading2"
             :disabled="loading2"
             large color="primary"
             @click.native="loader = 'loading2'"
             style="margin-bottom: 0;">查询
        <span slot="loader">查询中，请稍后</span>
      </v-btn>
      </div>
    <div id="pmSearchContentButton" @click="pmSearchContentTelescopic()" class="elevation-1" style="position:absolute;left: 31.25rem;top:1rem;height: 4rem;width: 4rem;background-color: white;cursor:pointer;">
      <img src="./assets/Telescopic.png" style="width:2rem;margin:1.2rem 0 0 1rem" />
    </div>
    <div id="pmSearchResultButton" class="elevation-1"  @click="pmSearchResultTelescopic()" style="position:absolute;right: 31.25rem;top:1rem;height: 4rem;width: 4rem;background-color: white;cursor:pointer;">
      <img src="./assets/Telescopic.png" style="width:2rem;margin:1.2rem 0 0 1rem" />
    </div>
    <div v-show="pmSearchResultshow" class="elevation-2" style="width:30.25rem;position:absolute;right: 0px;background-color: white;">
      <pm-search-result></pm-search-result>
    </div>
  </div>

</template>

<script>
  import { LMap, LTileLayer, LMarker, LPopup,LLayerGroup} from 'vue2-leaflet';
  import pmSearchRange from '@/components/pmSearchRange'
  import PmSearchCondition from './components/pmSearchCondition'
  import PmSearchResult from './components/pmSearchResult'
  const tileProviders = [
    {
      name: 'TianDiTuNormalMap',
      visible: true,
      url: 'http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}',
      subdomains:{subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']},
    },
    {
      name: 'TianDiTuNormalAnnotion',
      visible: true,
      url: 'http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}',
      subdomains:{subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']},
    },
    {
      name: 'TianDiTuSatelliteMap',
      visible: false,
      url: 'http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}',
      subdomains:{subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']},
    },
    {
      name: 'TianDiTuSatelliteAnnotion',
      visible: false,
      url: 'http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}',
      subdomains:{subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']},
    },
    {
      name: 'TianDiTuTerrainMap',
      visible: false,
      url: 'http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}',
      subdomains:{subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']},
    },
    {
      name: 'TianDiTuTerrainAnnotion',
      visible: false,
      url: 'http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}',
      subdomains:{subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']},
    },
    {
      name: 'GoogleNormalMap',
      visible: false,
      url: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
      subdomains:{subdomains: []},
    },
    {
      name: 'GoogleSatelliteMap',
      visible: false,
      url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
      subdomains:{subdomains: []},
    },
  ];
  export default {
    name: 'pm-search-main-page',
    components: {
      PmSearchResult,
      PmSearchCondition,
      pmSearchRange,
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      LLayerGroup
    },
    data () {
      return {
        pmSearchContentshow:true,
        pmSearchResultshow:true,
        zoom: 5,
        center: L.latLng(36, 105),
        tileProviders: tileProviders,
        marker: L.latLng(36, 105),
        text: 'this is a marker',
        loader: null,
        loading2: false,
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      }
    },
    methods:{
      pmSearchContentTelescopic:function () {
        this.pmSearchContentshow = !this.pmSearchContentshow
        if(document.getElementById('pmSearchContentButton').offsetLeft === 438){
          document.getElementById('pmSearchContentButton').style.left='1rem'
        }
        else{
          document.getElementById('pmSearchContentButton').style.left='438px'
        }

      },
      pmSearchResultTelescopic:function () {
        this.pmSearchResultshow = !this.pmSearchResultshow
        if(this.pmSearchResultshow === false){
          document.getElementById('pmSearchResultButton').style.right='1rem'
        }
        else{
          document.getElementById('pmSearchResultButton').style.right='438px'
        }
      }
    }
  }
</script>

<style scoped>

</style>
