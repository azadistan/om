<template>
  <div  class="elevation-1" style="width:26.25rem;margin:1rem 0 0 2rem;float: bottom">
    <div style="height:1rem;margin:0 0 2.3rem 0;font-family: 微软雅黑;color:grey;font-size: large;font-weight:bold;">
      <img src="../assets/titlePng.png" style="float:left;height:20px;margin:1rem 0 0 1rem">
      <div style="float:left;margin:0.7rem 0 0 1rem">目标地理范围</div>
    </div>
    <v-tabs
      color="white"
      show-arrows
      height="24"
      grow
      value="s1"
    >
      <v-tabs-slider color="blue"style="margin-left: 0px;"></v-tabs-slider>

      <v-tab href="#s1">
        行政区域
      </v-tab>
      <v-tab  class="elevation-1" href="#s2">
        国外
      </v-tab>
      <v-tab href="#s3">
        经纬度
      </v-tab>
      <v-tab  class="elevation-1" href="#s4">
        绘制区域
      </v-tab>
      <v-tab href="#s5">
        上传文件
      </v-tab>

      <v-tabs-items style="margin-top:0.25rem;">
        <v-tab-item
          id="s1"
          key="1"
        >
          <div style="width:26.25rem;height:9rem;margin:0rem 0 2px 0px;float: bottom;border-top:#e0e0e0 solid 1px;">
            <div style="width:26.25rem;height:4.5rem;margin-top: 0rem">
              <div style="float: left;height: 2rem;width: 7.3rem;margin:0 0 1rem 1rem;">
                <v-select
                  :items="chinaProvinceItems"
                  label="省份"
                  v-model=chinaProvinceNow
                ></v-select>
              </div>
              <div style="float: left;height: 2rem;width: 7.3rem;margin:0 0 1rem 1rem;">
                <v-select
                  :items="chinaCityItems"
                  label="城市"
                  v-model=chinaCityNow
                ></v-select>
              </div>
              <div style="float: left;height: 2rem;width: 7.3rem;margin:0 0 1rem 1rem;">
                <v-select
                  :items="chinaCountyItems"
                  label="区县"
                  v-model=chinaCountyNow
                ></v-select>
              </div>
            </div>
            <div style="width:26.25rem;height:2rem;margin-top: 1.5rem">
              <div style="width:4rem;float:left;height:1.5rem;margin-left: 5.35rem">
                <v-btn flat @click="chinaRegionsConfirm()" color="primary">确认</v-btn>
              </div>
              <div style="width:4rem;float:left;height:1.5rem;margin-left: 4rem">
                <v-btn flat  @click="chinaRegionsReset()" color="primary">重置</v-btn>
              </div>
            </div>
          </div>
          <div style="height: 2rem;width: 2rem"></div>
        </v-tab-item>
        <v-tab-item
          id="s2"
          key="2"
        >
          <div style="width:26.25rem;height:8rem;margin:0rem 0 2px 0px;float: bottom;border-top:#e0e0e0 solid 1px;">
            <div style="width:25rem;height:4.5rem;padding:0.5rem 0 0 3.7rem">
                <v-autocomplete
                  :items="pmCountries"
                  placeholder="请输入或选择国家"
                  no-data-text="对不起，没有该国家"
                  clearable
                  style="width: 15rem;margin: 0 0 0 2rem"
                  v-model="pmCountriesNow"
                ></v-autocomplete>
            </div>
            <div style="width:25rem;height:2rem;">
              <div style="width:4rem;float:left;height:1.5rem;margin-left: 5.35rem">
                <v-btn flat color="primary" @click="pmCountriesConfirm()">确认</v-btn>
              </div>
              <div style="width:4rem;float:left;height:1.5rem;margin-left: 4rem">
                <v-btn flat color="primary" @click="pmCountriesReset()">重置</v-btn>
              </div>
            </div>
          </div>
        </v-tab-item>
        <v-tab-item
          id="s3"
          key="3"
        >
          <pm-latitude></pm-latitude>
        </v-tab-item>
        <v-tab-item
          id="s4"
          key="4"
        >
          <pm-draw-area></pm-draw-area>
        </v-tab-item>
        <v-tab-item
          id="s5"
          key="5"
        >
          <pm-upload-files></pm-upload-files>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
  import PmLatitude from './pmLatitude'
  import PmUploadFiles from './pmUploadFiles'
  import PmDrawArea from './pmDrawArea'

  export default {
    components: {
      PmDrawArea,
      PmUploadFiles,
      PmLatitude
    },
    name: 'pm-search-range',
    data () {
      return {
        chinaProvinceNow: '',
        chinaCityNow: '',
        chinaCountyNow: '',
        chinaProvinceItems:'',
        chinaCityItems:[],
        chinaCountyItems:[],
        chinaProvinceAndId:[],
        chinaCityAndId:[],
        chinaIdNow:'',
        chinaCityIdNow:'',
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        pmCountries:['Foo', 'Bar', 'Fizz', 'Buzz'],
        pmCountriesNow:'',
      }
    },
    methods:{
      chinaProvinceItemsGet:function () {
        var chinaProvinceC = []
        var chinaProvinceAndId =[]
        this.$axios.get('http://192.168.20.56:8077/Area/id=-1')
          .then((res) => {
            for(var i=0;i<res.data.data.length;i++)
            {
              chinaProvinceC.push(res.data.data[i].areaName)
              chinaProvinceAndId.push([res.data.data[i].areaName,res.data.data[i].areaId])
            }
            this.chinaProvinceItems = chinaProvinceC
            this.chinaProvinceAndId = chinaProvinceAndId
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      chinaCityItemsGet:function () {
        var length = this.chinaProvinceAndId.length
        var chinaCityAndId =[]
        for(var i=0;i<length;i++){
          if(this.chinaProvinceAndId[i][0] === this.chinaProvinceNow)
          {
            this.chinaIdNow = this.chinaProvinceAndId[i][1]
            var chinaCityItems = []
            this.$axios.get('http://192.168.20.56:8077/Area/id='+this.chinaIdNow)
              .then((res) => {
                for(var i=0;i<res.data.data.length;i++)
                {
                  chinaCityAndId.push([res.data.data[i].areaName,res.data.data[i].areaId])
                  chinaCityItems.push(res.data.data[i].areaName)
                }
                this.chinaCityItems = chinaCityItems
                this.chinaCityAndId = chinaCityAndId
              })
              .catch(function (err) {
                console.log(err)
              })
          }
        }
      },
      chinaCountyItemsGet:function () {
        var length = this.chinaCityAndId.length
        for(var i=0;i<length;i++){
          if(this.chinaCityAndId[i][0] === this.chinaCityNow)
          {
            this.chinaCityIdNow = this.chinaCityAndId[i][1]
            var chinaCountyItems = []
            this.$axios.get('http://192.168.20.56:8077/Area/id='+this.chinaCityIdNow)
              .then((res) => {
                for(var i=0;i<res.data.data.length;i++)
                {
                  chinaCountyItems.push(res.data.data[i].areaName)
                }
                this.chinaCountyItems = chinaCountyItems
              })
              .catch(function (err) {
                console.log(err)
              })
          }
        }
      },
      chinaRegionsConfirm:function () {
        if(this.chinaProvinceNow ==='') {
          alert("输入不合法，请重新输入")
        }
        else if(this.chinaCityNow === ''){
          this.$axios.get('http://192.168.20.56:8077/Area/id=-1')
            .then((res) => {
              for(var i=0;i<res.data.data.length;i++)
              {
                if(res.data.data[i].areaName === this.chinaProvinceNow ){
                  this.$store.commit('geoJsonChange',res.data.data[i].areaGeojson)
                }
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        }
        else if(this.chinaCountyNow === ''){
          this.$axios.get('http://192.168.20.56:8077/Area/id='+this.chinaIdNow)
            .then((res) => {
              for(var i=0;i<res.data.data.length;i++)
              {
                if(res.data.data[i].areaName === this.chinaCityNow){
                  this.$store.commit('geoJsonChange',res.data.data[i].areaGeojson)
                }
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        }
        else{
          this.$axios.get('http://192.168.20.56:8077/Area/id='+this.chinaCityIdNow)
            .then((res) => {
              for(var i=0;i<res.data.data.length;i++)
              {
                if(res.data.data[i].areaName === this.chinaCountyNow){
                  this.$store.commit('geoJsonChange',res.data.data[i].areaGeojson)
                }
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        }
        this.$store.commit('mapResetChange',0)
      },
      chinaRegionsReset:function () {
        this.chinaProvinceNow = ''
        this.$store.commit('geoJsonChange','')
        this.$store.commit('mapResetChange',1)
      },
      geoJsonReverse:function (geoJsonLong) {

        var length =geoJsonLong.coordinates[0].length
        for(var ii=0;ii<length;ii++)
        {
          var tmp = geoJsonLong.coordinates[0][ii][0]
          geoJsonLong.coordinates[0][ii][0] = geoJsonLong.coordinates[0][ii][1]
          geoJsonLong.coordinates[0][ii][1] = tmp
        }
        return geoJsonLong.coordinates[0]
      },
      pmCountriesGet:function () {
        this.$axios.get("http://192.168.20.56:8077/Area/countrylist").then((res) => {
          var pmCountriesAll = []
          var length = res.data.data.length
          for(var i=0;i<length;i++){
            pmCountriesAll.push(res.data.data[i].countryName)
          }
          this.pmCountries = pmCountriesAll
        })
          .catch(function (err) {
            console.log(err)
          })
      },
      pmCountriesConfirm:function () {
          if(this.pmCountriesNow === ''){
            alert("输入不合法，请重新输入")
          }
          else{
            this.$axios.get('http://192.168.20.56:8077/Area/countrylist')
              .then((res) => {
                for(var i=0;i<res.data.data.length;i++)
                {
                  if(res.data.data[i].countryName === this.pmCountriesNow){
                    this.$store.commit('geoJsonChange',res.data.data[i].imageGeo)
                  }
                }
              })
              .catch(function (err) {
                console.log(err)
              })
          }
        this.$store.commit('mapResetChange',0)
      },
      pmCountriesReset:function () {
        this.pmCountriesNow = ''
        this.$store.commit('mapResetChange',1)
      },
    },
    mounted(){
      this.chinaProvinceItemsGet()
      this.pmCountriesGet()
    },
    watch:{
      chinaProvinceNow:{
        handler:function(val){
          this.chinaCityItems = []
          this.chinaCountyItems = []
          this.chinaCityNow=''
          this.chinaCountyNow=''
          this.chinaCityItemsGet()
        }
      },
      chinaCityNow:{
        handler:function(val){
          this.chinaCountyNow=''
          this.chinaCountyItemsGet()
        }
      },
      pmCountriesNow:{
        handler:function(val){
        }
      },
    },
  }
</script>

<style scoped>

</style>
