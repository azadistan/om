<template>
  <div class="vue-leaflet">
    <l-map ref="map" style="width: 100%; height: 100%;position: fixed;bottom: 0;" :zoom.sync="zoom" :center="center":bounds="bounds":options="option" >
      <l-tile-layer v-for="tileProvider in tileProviders"
                    layerType="base" :name="tileProvider.name" :visible="tileProvider.visible"
                    :url="tileProvider.url" :options="tileProvider.subdomains" :token="token"/>
    </l-map>
    <div v-show="pmSearchContentshow" class="elevation-2" style="width:30.25rem;position:absolute;background-color: white;margin:1rem 0 0 1rem;border: 1px solid #C5C5C5">
          <pm-search-range></pm-search-range>
          <pm-search-condition></pm-search-condition>
      <v-btn block
             large color="primary"
             @click="pmSearch()"
             style="margin-bottom: 0;">查询
      </v-btn>
      </div>
    <div id="pmSearchContentButton" @click="pmSearchContentTelescopic()" class="elevation-1" style="border: 1px solid #C5C5C5;position:absolute;left: 32.25rem;top:1rem;height: 4rem;width: 4rem;background-color: white;cursor:pointer;">
      <img src="./assets/Telescopic.png" style="width:2rem;margin:1.2rem 0 0 1rem" />
    </div>
    <div id="pmSearchResultButton" class="elevation-1"  @click="pmSearchResultTelescopic()" style="border: 1px solid #C5C5C5;position:absolute;right: 1rem;top:1rem;height: 4rem;width: 4rem;background-color: white;cursor:pointer;">
      <img src="./assets/Telescopic.png" style="width:2rem;margin:1.2rem 0 0 1rem" />
    </div>
    <div v-show="pmSearchResultshow" class="elevation-2" style="width:30.25rem;position:absolute;right: 0px;background-color: white;margin: 1rem 1rem 0 0;border: 1px solid #C5C5C5">
      <pm-search-result></pm-search-result>
    </div>
    <v-dialog v-model="dialog1" width="500">
      <v-card>
        <v-card-title class="headline primary white--text  " primary-title>操作提示
        </v-card-title>
        <v-card-text id="dialogText" primary style="margin-top: 50px;  text-align:center;height: 120px;font-size: 20px">绘制区域动作未重置，请点击重置!
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog1 = false">关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
  import { LMap, LTileLayer, LMarker, LPopup,LLayerGroup,LCircle, LRectangle, LPolygon, LPolyline,LGeoJson} from 'vue2-leaflet';
  import pmSearchRange from '@/components/pmSearchRange'
  import PmSearchCondition from './components/pmSearchCondition'
  import PmSearchResult from './components/pmSearchResult'
  import qs from 'qs'
  import * as turf from '@turf/turf/index'
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
  var areaLayerGroup = new L.LayerGroup();//目标地理范围查询结果图层
  var layerGroup = new L.LayerGroup();    //用户查询结果图层
  var spelayerGroup = new L.LayerGroup(); //所有产品用户点选结果图层
  var advlayerGroup = new L.LayerGroup(); //用户选择缩略图展示图层
  var geoJSON= new Array()
  var geoString = ""
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
      LLayerGroup,
      LCircle,
      LRectangle,
      LPolygon,
      LPolyline,
      LGeoJson
    },
    data () {
      return {
        dialog1:false,
        show:true,
        enableTooltip: true,
        geojson1:[],
        circleShow:false,
        rectangleShow:true,
        polygonShow:false,
        pmSearchContentshow:true,
        pmSearchResultshow:false,
        option: {zoomControl: false, attributionControl: false},
        zoom: 6,
        center: [36,105],
        bounds:'',
        tileProviders: tileProviders,
        marker: L.latLng(36, 105),
        text: 'this is a marker',
        loader: null,
        loading2: false,
        circle: {
          center: [0,0],
          radius: 0
        },
        rectangle: {
          bounds: [[0, 0], [0, 0]],
          style: { color: 'red', weight: 5 }
        },
        polygon: {
          latlngs: [[0, 0], [0, 0]],
          color: '#ff00ff'
        },
        image_geo:'', //给后台的查询参数*5
        client_name:'',
        product_description:'',
        producer:'',
        industry:'',
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 300)
        this.loader = null
      },
      centerDataC: {
        handler () {
          // this.center = this.$store.state.centerData
        },
        deep: true
      },
      centerNowC: {
        handler () {
          this.$store.commit('centerDataChange',this.center)
        },
        deep: true
      },
      zoomDataC: {
        handler () {
          // this.zoom = this.$store.state.zoomData
        },
        deep: true
      },
      zoomNowC: {
        handler () {
          this.$store.commit('zoomDataChange',this.zoom)
        },
        deep: true
      },
      rectangleDataC: {
        handler () {
          areaLayerGroup.clearLayers()
          areaLayerGroup.addTo(this.$refs.map.mapObject)
          this.rectangle.bounds = [[this.$store.state.coordinateData[0],this.$store.state.coordinateData[1]],
            [this.$store.state.coordinateData[2],this.$store.state.coordinateData[3]]]
          var rectangle = L.rectangle(this.rectangle.bounds)
          areaLayerGroup.addLayer(rectangle)
          this.$refs.map.mapObject.fitBounds(rectangle.getBounds())
          this.$store.commit('sendJsonChange',rectangle.toGeoJSON().geometry)
        },
        deep: true
      },
      circleDataC: {
        handler () {
          areaLayerGroup.clearLayers()
          areaLayerGroup.addTo(this.$refs.map.mapObject);
          this.circle.center=[this.$store.state.circleData[0],this.$store.state.circleData[1]]
          this.circle.radius=this.$store.state.circleData[2]
          var circle = L.circle(this.circle.center, {radius: this.circle.radius*1000}).addTo(this.$refs.map.mapObject)
          areaLayerGroup.addLayer(circle);
          this.$refs.map.mapObject.fitBounds(circle.getBounds())
          var options = {steps: 64, units: 'kilometers', properties: {foo: 'bar'}};
          var circleGeoJson = turf.circle([this.$store.state.circleData[1],this.$store.state.circleData[0]], this.circle.radius,options);
          this.$store.commit('sendJsonChange',circleGeoJson.geometry)
        },
        deep: true
      },
      polygonDataC: {
        handler () {
          areaLayerGroup.clearLayers()
          areaLayerGroup.addTo(this.$refs.map.mapObject);
          this.polygon.latlngs = this.$store.state.polygonData
          var polygon = L.polygon(this.polygon.latlngs)
          areaLayerGroup.addLayer(polygon);
          this.$refs.map.mapObject.fitBounds(polygon.getBounds())
          this.$store.commit('sendJsonChange',polygon.toGeoJSON().geometry)
        },
        deep: true
      },
      geoJsonC:{
        handler(){
          areaLayerGroup.clearLayers()
          areaLayerGroup.addTo(this.$refs.map.mapObject);
          var test = L.geoJSON().addTo(this.$refs.map.mapObject)
          this.geojson1 = this.strToJson(this.$store.state.geoJsonNow)
          test.addData(this.geojson1);
          areaLayerGroup.addLayer(test);
          this.$refs.map.mapObject.fitBounds(L.geoJSON(this.geojson1).getBounds())
          this.$store.commit('sendJsonChange',this.geojson1)
        },
        deep: true
        },
      getSendJsonC:{
        handler () {
          this.image_geo = this.$store.state.sendJson
        },
        deep: true
      },
      speGeoJsonSelectC:{
        handler (val,oldVal) {
          spelayerGroup.addTo(this.$refs.map.mapObject);
          var length1 = val.length
          var length2 = oldVal.length
          if(length1 === 0){
            spelayerGroup.clearLayers()
          }
          if(length1 === length2+1 || length === 1 && length2 ===1){
            var geoJsonYellow = L.geoJSON().addTo(this.$refs.map.mapObject);
            geoJsonYellow.addData(val[length1-1]);
            geoJsonYellow.setStyle({"color": 'yellow'})
            spelayerGroup.addLayer(geoJsonYellow);
            this.$refs.map.mapObject.fitBounds(L.geoJSON(val[length1-1]).getBounds())
          }
          else{
            spelayerGroup.clearLayers()
            for(var i=0;i<length1;i++){
              var geoJsonYellow = L.geoJSON().addTo(this.$refs.map.mapObject);
              geoJsonYellow.addData(val[i]);
              geoJsonYellow.setStyle({"color": 'yellow'})
              spelayerGroup.addLayer(geoJsonYellow);
            }
          }
        },
        deep: true
      },
      mapResetC:{
        handler () {
          if(this.$store.state.mapReset === 0){}
          else{
            this.$refs.map.mapObject.setView([36,105],6)
            areaLayerGroup.clearLayers()
            // layerGroup.clearLayers()
            // spelayerGroup.clearLayers()
            this.image_geo = ''
            geoString = ''
            this.$refs.map.mapObject.off('draw:created')
          }
        },
        deep: true
      },
      drawAreaC:{
        handler () {
          if(this.$store.state.drawAreaId === 1){
            this.drawRectangle()
            this.$store.commit('drawAreaChange',0)
          }
          if(this.$store.state.drawAreaId === 2){
            this.drawCircle()
            this.$store.commit('drawAreaChange',0)
          }
          if(this.$store.state.drawAreaId === 3){
            this.drawPolygon()
            this.$store.commit('drawAreaChange',0)
          }
        },
        deep: true
      },
      advUrlAndJsonC:{
        handler (val,oldVal) {
          advlayerGroup.addTo(this.$refs.map.mapObject);
          var length1 = val.length
          var length2 = oldVal.length
          if(length1 === 0){
            advlayerGroup.clearLayers()
          }
          if(length1>=length2 || length === 1 && length2 ===1){
            var imageUrl = val[length1-1][0],
              imageBounds = val[length1-1][1]
            var arr = String(imageBounds).split(",")
            var imageBoundsNew = []
            for(var i=0;i<arr.length;i=i+2){
              imageBoundsNew.push([arr[i+1],arr[i]])
            }
            var image = L.imageOverlay(imageUrl,imageBoundsNew)
            advlayerGroup.addLayer(image)
            this.$refs.map.mapObject.fitBounds(imageBoundsNew)
          }
          if(length1<length2){
            advlayerGroup.clearLayers()
            for(var i=0;i<length1;i++){
              var imageUrl = val[i][0],
                imageBounds = val[i][1]
              var arr = String(imageBounds).split(",")
              var imageBoundsNew = []
              for(var i=0;i<arr.length;i=i+2){
                imageBoundsNew.push([arr[i+1],arr[i]])
              }
              var image = L.imageOverlay(imageUrl, imageBoundsNew)
              advlayerGroup.addLayer(image)
            }
          }

        },
        deep: true
      },//高级产品添加贴图
      advPageC:{
        handler (val) {
          if(this.$store.state.advResultsNow.length !=0){
            this.$store.commit('productResultChange',2)
            advlayerGroup.clearLayers()
            spelayerGroup.clearLayers()
            if(geoString != ""){this.image_geo = geoString}
            let jsonParams = {
              orthoProduct:this.$store.state.orthoProduct,
              inlayProduct:this.$store.state.inlayProduct,
              subdivisionProduct:this.$store.state.subdivisionProduct,
              advProducePerson:this.$store.state.advProducePerson,
              advProductName:this.$store.state.advProductName,
              advProduceAddress:this.$store.state.advProduceAddress,
              advDataDelivery:this.$store.state.advDataDelivery,
              advDataDeliveryObject:this.$store.state.advDataDeliveryObject,
              advProduceStartTime:this.$store.state.advProduceStartTime,
              advProduceEndTime:this.$store.state.advProduceEndTime,
              advDeliveryStartTime:this.$store.state.advDeliveryStartTime,
              advDeliveryEndTime:this.$store.state.advDeliveryEndTime,
              image_geo:this.image_geo,
            }
            this.$axios.get("http://192.168.20.56:8077/AdvanceProductListByGeos",{
              params:{
                json:JSON.stringify(jsonParams),
                curPageNum:val,
                maxResultNum:10
              },
              paramsSerializer: function(params) {
                return qs.stringify(params, {arrayFormat: 'brackets'})
              },
            }).then((res) => {
              if(res.data.data === null){
                var empty = []
                this.$store.commit('advResultsChange',empty)
                this.$store.commit('dialogChange',[true,'对不起，没有符合条件的查询结果'])
              }
              else{
                if(this.pmSearchResultshow === false){
                  this.pmSearchResultTelescopic()
                }
                var resultListFormat= []
                var geoJsonSelectShow= []
                var length = res.data.data.productQueryList.length
                this.$store.commit('advPageTotalChange',res.data.data.totalPageNum)
                for(var i=0;i<length;i++){
                  var tmpGeoJson = []
                  if(res.data.data.productQueryList[i].imageGeo === null){}
                  else{tmpGeoJson = this.strToJson(res.data.data.productQueryList[i].imageGeo)}
                  resultListFormat.push(
                    {
                      value:false,
                      advId:res.data.data.productQueryList[i].productId,
                      advName:res.data.data.productQueryList[i].productName,
                      advType:res.data.data.productQueryList[i].productType,
                      advGeoJson:tmpGeoJson,
                      advDownload:res.data.data.productQueryList[i].downloadurl,
                      advThumbUrl:res.data.data.productQueryList[i].thumbUrl,//小
                      advThumbnailUrl:res.data.data.productQueryList[i].thumbnailUrl,//大
                    }
                  )
                  geoJsonSelectShow.push(tmpGeoJson)
                }
                layerGroup.clearLayers()
                layerGroup.addTo(this.$refs.map.mapObject);
                this.geojsonSelectShow(geoJsonSelectShow)
                this.$store.commit('advResultsChange',resultListFormat)

              }
            })
              .catch(function (err) {
                console.log(err)
              })
          }
        },
        deep: true
      },//高级产品更改页数
      spePageC:{
        handler (val){
          if(this.$store.state.speResultsNow.length !=0) {
            this.$store.commit('productResultChange', 3)
            advlayerGroup.clearLayers()
            spelayerGroup.clearLayers()
            if (geoString != "") {
              this.image_geo = geoString
            }
            let jsonParams = {
              client_name: this.$store.state.serviceObjectNow,
              product_description: this.$store.state.speDescriptionNow,
              producer: this.$store.state.productObjectNow,
              industry: this.industryPush(),
              image_geo: this.image_geo,
            }
            this.$axios.get("http://192.168.20.56:8077/ThemeticProductListByGeos", {
              params: {
                json: JSON.stringify(jsonParams),
                curPageNum: val,
                maxResultNum:10
              },
              paramsSerializer: function (params) {
                return qs.stringify(params, {arrayFormat: 'brackets'})
              },
            }).then((res) => {
              if (res.data.data === null) {
                var empty = []
                this.$store.commit('speResultsChange', empty)
                this.$store.commit('dialogChange',[true,'对不起，没有符合条件的查询结果'])
              }
              else {
                if (this.pmSearchResultshow === false) {
                  this.pmSearchResultTelescopic()
                }
                var resultListFormat = []
                var geoJsonSelectShow = []
                var length1 = res.data.data.productQueryList.length
                this.$store.commit('spePageTotalChange', res.data.data.totalPageNum)
                for (var i = 0; i < length1; i++) {
                  var length2 = res.data.data.productQueryList[i].themeticProductSimpleInfoList.length
                  var speGeoJson = []
                  for (var j = 0; j < length2; j++) {
                    if (res.data.data.productQueryList[i].themeticProductSimpleInfoList[j].imageGeo === null) {
                    }
                    else {
                      var tmp = res.data.data.productQueryList[i].themeticProductSimpleInfoList[j].imageGeo
                      tmp = this.strToJson(tmp)
                      geoJsonSelectShow.push(tmp)
                      speGeoJson.push(tmp)
                    }
                  }
                  resultListFormat.push(
                    {
                      value: false,
                      speId: res.data.data.productQueryList[i].productId,
                      speName: res.data.data.productQueryList[i].productName,
                      speIndustry: this.industryCombination(res.data.data.productQueryList[i].industryList),
                      speGeoJson: speGeoJson,
                      speDownload: res.data.data.productQueryList[i].url
                    }
                  )
                }
                layerGroup.clearLayers()
                layerGroup.addTo(this.$refs.map.mapObject);
                this.geojsonSelectShow(geoJsonSelectShow)
                this.$store.commit('speResultsChange', resultListFormat)
              }
            })
              .catch(function (err) {
                console.log(err)
              })
          }
        },
        deep: true
      },//专题产品改变页数
      dialogC:{
        handler (val){
          this.dialog1 = val[0]
          document.getElementById("dialogText").innerHTML = val[1]
        }
      }
    },
    methods:{
      pmSearchContentTelescopic:function () {
        this.pmSearchContentshow = !this.pmSearchContentshow
        if(this.pmSearchContentshow === false){
          document.getElementById('pmSearchContentButton').style.left='1rem'
        }
        else{
          document.getElementById('pmSearchContentButton').style.left='454px'
        }

      },
      pmSearchResultTelescopic:function () {
        this.pmSearchResultshow = !this.pmSearchResultshow
        if(this.pmSearchResultshow === false){
          document.getElementById('pmSearchResultButton').style.right='1rem'
        }
        else{
          document.getElementById('pmSearchResultButton').style.right='454px'
        }
      },
      pmSearchResultTelescopicReverse:function () {
        this.pmSearchResultshow = false
        document.getElementById('pmSearchResultButton').style.right='1rem'
      },
      getGeoJson:function () {
        this.$axios.get('http://192.168.20.56:8077/Area/id=340800')
          .then((res) => {
            this.geojson1=this.strToJson(res.data.data[2].areaGeojson)
            this.$refs.map.mapObject.fitBounds(L.geoJSON(this.geojson1).getBounds())
          })
          .catch(function (err) {
            console.log(err)
          })

      },
      strToJson:function(str){
        var json = eval('(' + str + ')');
        return json;
  },
      drawRectangle:function () {
        this.$refs.map.mapObject.off('draw:created')
        areaLayerGroup.clearLayers();
        areaLayerGroup.addTo(this.$refs.map.mapObject)
        var rectangleDraw = new L.Draw.Rectangle(this.$refs.map.mapObject, {
          showArea: false,
          allowIntersection: false,
          shapeOptions: {
            color: '#0066FF',
            fillColor: '#0066FF',
            weight: 6
          }
        })
        geoJSON = undefined;
        rectangleDraw.enable();
        this.$refs.map.mapObject.on('draw:created', function (e) {
            var layer = e.layer;
            var geoJson = layer.toGeoJSON();
            var features = new Array();
            var points = new Array();
            for(var i=0;i< geoJson.geometry.coordinates[0].length;i++){
              features.push(turf.point(geoJson.geometry.coordinates[0][i]));
            }
            var points = turf.featureCollection(features);
            var convex = turf.convex(points);
            geoJSON = L.geoJSON(convex).toGeoJSON();
            function geoJsonToString(e){
              geoString = "";
              if(e.type === "Feature"){
                geoString = geoString+'{"type":'+'"'+e.geometry.type+'","coordinates":[[';
                geoString = geoString+"["+ e.geometry.coordinates[0][0][0].toString()+","+e.geometry.coordinates[0][0][1].toString()+"]";
                for (var i=1;i<e.geometry.coordinates[0].length-1;i++){
                  geoString = geoString+",["+e.geometry.coordinates[0][i][0].toString()+","+e.geometry.coordinates[0][i][1].toString()+']';
                }
                var temp = e.geometry.coordinates[0].length-1;
                geoString = geoString+",["+e.geometry.coordinates[0][temp][0].toString()+","+e.geometry.coordinates[0][temp][1].toString()+"]]]}";
                console.log(geoString);
              }else{
                if(e.features.length === 1){
                  if(e.features[0].geometry.coordinates.length === 1){
                    if(e.features[0].geometry.coordinates[0].length === 1){
                      for(var i=0;i<e.features[0].geometry.coordinates.length;i++){
                        geoString = geoString+'{"type":"polygon","coordinates":[[';
                        geoString = geoString+"["+ e.features[0].geometry.coordinates[i][0][0][0].toString()+","+e.features[0].geometry.coordinates[i][0][0][1].toString()+"]";
                        for (var j=1;j<e.features[0].geometry.coordinates[i][0].length-1;j++){
                          geoString = geoString+",["+e.features[0].geometry.coordinates[i][0][j][0].toString()+","+e.features[0].geometry.coordinates[i][0][j][1].toString()+']';
                        }
                        var temp = e.features[0].geometry.coordinates[i].length-1;
                        geoString = geoString+",["+e.features[0].geometry.coordinates[i][0][temp][0].toString()+","+e.features[0].geometry.coordinates[i][0][temp][1].toString()+"]]]}";
                      }

                    }else{
                      geoString = geoString+'{"type":'+'"'+e.features[0].geometry.type+'","coordinates":[[';
                      geoString = geoString+"["+ e.features[0].geometry.coordinates[0][0][0].toString()+","+e.features[0].geometry.coordinates[0][0][1].toString()+"]";
                      for (var i=1;i<e.features[0].geometry.coordinates[0].length-1;i++){
                        geoString = geoString+",["+e.features[0].geometry.coordinates[0][i][0].toString()+","+e.features[0].geometry.coordinates[0][i][1].toString()+']';
                      }
                      var temp = e.features[0].geometry.coordinates[0].length-1;
                      geoString = geoString+",["+e.features[0].geometry.coordinates[0][temp][0].toString()+","+e.features[0].geometry.coordinates[0][temp][1].toString()+"]]]}";
                      console.log(geoString);
                    }
                  }else{
                    for(var i=0;i<e.features[0].geometry.coordinates.length;i++){
                      geoString = geoString+'{"type":"polygon","coordinates":[[';
                      geoString = geoString+"["+ e.features[0].geometry.coordinates[i][0][0][0].toString()+","+e.features[0].geometry.coordinates[i][0][0][1].toString()+"]";
                      for (var j=1;j<e.features[0].geometry.coordinates[i][0].length-1;j++){
                        geoString = geoString+",["+e.features[0].geometry.coordinates[i][0][j][0].toString()+","+e.features[0].geometry.coordinates[i][0][j][1].toString()+']';
                      }
                      var temp = e.features[0].geometry.coordinates[i].length-1;
                      geoString = geoString+",["+e.features[0].geometry.coordinates[i][0][temp][0].toString()+","+e.features[0].geometry.coordinates[i][0][temp][1].toString()+"]]]}";
                      geoString = geoString+"@";
                    }
                    console.log(geoString);
                  }
                }else{
                  //  console.log(e.features.length);
                  // // console.log(JSON.stringify(e.features[0].geometry));
                  //  for(var k=0;k<10;k++){
                  //     geoArray.push(JSON.stringify(e.features[k].geometry));
                  //  }
                  //  //console.log(geoArray.toString());
                  //  geoString = geoArray.toString();
                }
              }
            }
            geoJsonToString(geoJSON);
            geoJSON = geoJSON.features[0].geometry;
            areaLayerGroup.addLayer(L.geoJSON(convex,{fill:true}));
            areaLayerGroup.off("draw:created");
          });

      },//绘制区域矩形函数
      drawCircle:function () {
        this.$refs.map.mapObject.off('draw:created')
        areaLayerGroup.clearLayers();
        areaLayerGroup.addTo(this.$refs.map.mapObject)
        var circleDraw = new L.Draw.Circle(this.$refs.map.mapObject, {
          showArea: false,
          allowIntersection: false,
          shapeOptions: {
            color: '#0066FF',
            fillColor: '#0066FF',
            weight: 6
          }
        })
        geoJSON = undefined;
        geoString = ""
        circleDraw.enable();
        this.$refs.map.mapObject.on('draw:created', function (e) {
            var type = e.layerType
            var layer1 = e.layer
            if (type === 'marker') {
              layer1.bindPopup('A popup!');
            }
            var circleRadius = layer1.getRadius()
            var circleCenter = layer1.getLatLng()
            circleCenter = circleCenter.toString();
            circleRadius = circleRadius.toString();
            circleRadius = circleRadius / 1000
            let str = circleCenter
            str = str.slice(7, -1)
            var arr = str.split(",");
            var options = {steps: 64, units: 'kilometers', properties: {foo: 'bar'}};
            var circleGeoJson = turf.circle([arr[1], arr[0]], circleRadius, options);
            var tmp = JSON.stringify(circleGeoJson.geometry)
            areaLayerGroup.addLayer(layer1);
            geoString = tmp
            areaLayerGroup.off("draw:created");
          });
      },//绘制区域圆形函数
      drawPolygon:function () {
        this.$refs.map.mapObject.off('draw:created')
        areaLayerGroup.clearLayers();
        areaLayerGroup.addTo(this.$refs.map.mapObject)
        var polygonDraw = new L.Draw.Polygon(this.$refs.map.mapObject, {
          showArea: false,
          allowIntersection: false,
          shapeOptions: {
            color: '#0066FF',
            fillColor: '#0066FF',
            weight: 6
          }
        })
        geoJSON = undefined;
        polygonDraw.enable();
        this.$refs.map.mapObject.on('draw:created', function (e) {
            var layer = e.layer;
            var geoJson = layer.toGeoJSON();
            var features = new Array();
            var points = new Array();
            for (var i = 0; i < geoJson.geometry.coordinates[0].length; i++) {
              features.push(turf.point(geoJson.geometry.coordinates[0][i]));
            }
            var points = turf.featureCollection(features);
            var convex = turf.convex(points);
            geoJSON = L.geoJSON(convex).toGeoJSON();

            function geoJsonToString (e) {
              geoString = "";
              if (e.type === "Feature") {
                geoString = geoString + '{"type":' + '"' + e.geometry.type + '","coordinates":[[';
                geoString = geoString + "[" + e.geometry.coordinates[0][0][0].toString() + "," + e.geometry.coordinates[0][0][1].toString() + "]";
                for (var i = 1; i < e.geometry.coordinates[0].length - 1; i++) {
                  geoString = geoString + ",[" + e.geometry.coordinates[0][i][0].toString() + "," + e.geometry.coordinates[0][i][1].toString() + ']';
                }
                var temp = e.geometry.coordinates[0].length - 1;
                geoString = geoString + ",[" + e.geometry.coordinates[0][temp][0].toString() + "," + e.geometry.coordinates[0][temp][1].toString() + "]]]}";
                console.log(geoString);
              } else {
                if (e.features.length === 1) {
                  if (e.features[0].geometry.coordinates.length === 1) {
                    if (e.features[0].geometry.coordinates[0].length === 1) {
                      for (var i = 0; i < e.features[0].geometry.coordinates.length; i++) {
                        geoString = geoString + '{"type":"polygon","coordinates":[[';
                        geoString = geoString + "[" + e.features[0].geometry.coordinates[i][0][0][0].toString() + "," + e.features[0].geometry.coordinates[i][0][0][1].toString() + "]";
                        for (var j = 1; j < e.features[0].geometry.coordinates[i][0].length - 1; j++) {
                          geoString = geoString + ",[" + e.features[0].geometry.coordinates[i][0][j][0].toString() + "," + e.features[0].geometry.coordinates[i][0][j][1].toString() + ']';
                        }
                        var temp = e.features[0].geometry.coordinates[i].length - 1;
                        geoString = geoString + ",[" + e.features[0].geometry.coordinates[i][0][temp][0].toString() + "," + e.features[0].geometry.coordinates[i][0][temp][1].toString() + "]]]}";
                      }

                    } else {
                      geoString = geoString + '{"type":' + '"' + e.features[0].geometry.type + '","coordinates":[[';
                      geoString = geoString + "[" + e.features[0].geometry.coordinates[0][0][0].toString() + "," + e.features[0].geometry.coordinates[0][0][1].toString() + "]";
                      for (var i = 1; i < e.features[0].geometry.coordinates[0].length - 1; i++) {
                        geoString = geoString + ",[" + e.features[0].geometry.coordinates[0][i][0].toString() + "," + e.features[0].geometry.coordinates[0][i][1].toString() + ']';
                      }
                      var temp = e.features[0].geometry.coordinates[0].length - 1;
                      geoString = geoString + ",[" + e.features[0].geometry.coordinates[0][temp][0].toString() + "," + e.features[0].geometry.coordinates[0][temp][1].toString() + "]]]}";
                      console.log(geoString);
                    }
                  } else {
                    for (var i = 0; i < e.features[0].geometry.coordinates.length; i++) {
                      geoString = geoString + '{"type":"polygon","coordinates":[[';
                      geoString = geoString + "[" + e.features[0].geometry.coordinates[i][0][0][0].toString() + "," + e.features[0].geometry.coordinates[i][0][0][1].toString() + "]";
                      for (var j = 1; j < e.features[0].geometry.coordinates[i][0].length - 1; j++) {
                        geoString = geoString + ",[" + e.features[0].geometry.coordinates[i][0][j][0].toString() + "," + e.features[0].geometry.coordinates[i][0][j][1].toString() + ']';
                      }
                      var temp = e.features[0].geometry.coordinates[i].length - 1;
                      geoString = geoString + ",[" + e.features[0].geometry.coordinates[i][0][temp][0].toString() + "," + e.features[0].geometry.coordinates[i][0][temp][1].toString() + "]]]}";
                      geoString = geoString + "@";
                    }
                    console.log(geoString);
                  }
                } else {
                  //  console.log(e.features.length);
                  // // console.log(JSON.stringify(e.features[0].geometry));
                  //  for(var k=0;k<10;k++){
                  //     geoArray.push(JSON.stringify(e.features[k].geometry));
                  //  }
                  //  //console.log(geoArray.toString());
                  //  geoString = geoArray.toString();
                }
              }
            }

            geoJsonToString(geoJSON)
            geoJSON = geoJSON.features[0].geometry;
            areaLayerGroup.addLayer(L.geoJSON(convex, {fill: true}));
            this.image_geo = geoString
            areaLayerGroup.off("draw:created");
          });
      },//绘制区域多边形函数
      pmSearch:function () {
        if(this.$store.state.productTypeNow ===3){
          this.$store.commit('productResultChange',3)
          advlayerGroup.clearLayers()
          spelayerGroup.clearLayers()
          if(geoString != ""){this.image_geo = geoString}
          let jsonParams = {
            client_name:this.$store.state.serviceObjectNow,
            product_description:this.$store.state.speDescriptionNow,
            producer:this.$store.state.productObjectNow,
            industry:this.industryPush(),
            image_geo:this.image_geo,
          }
          this.$axios.get("http://192.168.20.56:8077/ThemeticProductListByGeos",{
            params:{
              json:JSON.stringify(jsonParams),
              curPageNum:1,
              maxResultNum:10
            },
            paramsSerializer: function(params) {
              return qs.stringify(params, {arrayFormat: 'brackets'})
            },
          }).then((res) => {
            if(res.data.data === null){
              var empty = []
              this.$store.commit('speResultsChange',empty)
              this.$store.commit('dialogChange',[true,'对不起，没有符合条件的查询结果'])
              this.$store.commit('advResultsChange',empty)
              this.$store.commit('advPageTotalChange',1)
              this.$store.commit('advPageChange',1)
              layerGroup.clearLayers()
              if(this.pmSearchResultshow === false){
                this.pmSearchResultTelescopic()
                this.pmSearchContentTelescopic()
              }
            }
            else{
              if(this.pmSearchResultshow === false){
                this.pmSearchResultTelescopic()
                this.pmSearchContentTelescopic()
              }
              var empty = []
              this.$store.commit('advResultsChange',empty)
              this.$store.commit('advPageTotalChange',1)
              this.$store.commit('advPageChange',1)
              var resultListFormat= []
              var geoJsonSelectShow= []
              var length1 = res.data.data.productQueryList.length
              this.$store.commit('spePageTotalChange',res.data.data.totalPageNum)
              for(var i=0;i<length1;i++){
                var length2 = res.data.data.productQueryList[i].themeticProductSimpleInfoList.length
                var speGeoJson =[]
                for(var j=0;j<length2;j++){
                  if(res.data.data.productQueryList[i].themeticProductSimpleInfoList[j].imageGeo === null){}
                  else{
                    var tmp = res.data.data.productQueryList[i].themeticProductSimpleInfoList[j].imageGeo
                    tmp = this.strToJson(tmp)
                    geoJsonSelectShow.push(tmp)
                    speGeoJson.push(tmp)
                  }
                }
                resultListFormat.push(
                  {
                    value:false,
                    speId:res.data.data.productQueryList[i].productId,
                    speName:res.data.data.productQueryList[i].productName,
                    speIndustry:this.industryCombination(res.data.data.productQueryList[i].industryList),
                    speGeoJson:speGeoJson,
                    speDownload:res.data.data.productQueryList[i].url
                  }
                )
              }
              layerGroup.clearLayers()
              layerGroup.addTo(this.$refs.map.mapObject);
              this.geojsonSelectShow(geoJsonSelectShow)
              this.$store.commit('speResultsChange',resultListFormat)
            }
          })
            .catch(function (err) {
              console.log(err)
            })
        }
        if(this.$store.state.productTypeNow ===2){
          this.$store.commit('productResultChange',2)
          advlayerGroup.clearLayers()
          spelayerGroup.clearLayers()
          if(geoString != ""){this.image_geo = geoString}
          let jsonParams = {
            orthoProduct:this.$store.state.orthoProduct,
            inlayProduct:this.$store.state.inlayProduct,
            subdivisionProduct:this.$store.state.subdivisionProduct,
            advProducePerson:this.$store.state.advProducePerson,
            advProductName:this.$store.state.advProductName,
            advProduceAddress:this.$store.state.advProduceAddress,
            advDataDelivery:this.$store.state.advDataDelivery,
            advDataDeliveryObject:this.$store.state.advDataDeliveryObject,
            advProduceStartTime:this.$store.state.advProduceStartTime,
            advProduceEndTime:this.$store.state.advProduceEndTime,
            advDeliveryStartTime:this.$store.state.advDeliveryStartTime,
            advDeliveryEndTime:this.$store.state.advDeliveryEndTime,
            image_geo:this.image_geo,
          }
          this.$axios.get("http://192.168.20.56:8077/AdvanceProductListByGeos",{
            params:{
              json:JSON.stringify(jsonParams),
              curPageNum:1,
              maxResultNum:10
            },
            paramsSerializer: function(params) {
              return qs.stringify(params, {arrayFormat: 'brackets'})
            },
          }).then((res) => {
            if(res.data.data === null || res.data.data === []){
              var empty = []
              this.$store.commit('advResultsChange',empty)
              this.$store.commit('dialogChange',[true,'对不起，没有符合条件的查询结果'])
              this.$store.commit('speResultsChange',empty)
              this.$store.commit('spePageTotalChange',1)
              this.$store.commit('spePageChange',1)
              layerGroup.clearLayers()
              if(this.pmSearchResultshow === false){
                this.pmSearchResultTelescopic()
                this.pmSearchContentTelescopic()
              }
            }
            else{
              if(this.pmSearchResultshow === false){
                this.pmSearchResultTelescopic()
                this.pmSearchContentTelescopic()
              }
              var empty = []
              this.$store.commit('speResultsChange',empty)
              this.$store.commit('spePageTotalChange',1)
              this.$store.commit('spePageChange',1)
              var resultListFormat= []
              var geoJsonSelectShow= []
              var length = res.data.data.productQueryList.length
              this.$store.commit('advPageTotalChange',res.data.data.totalPageNum)
              for(var i=0;i<length;i++){
                var tmpGeoJson = []
                if(res.data.data.productQueryList[i].imageGeo === null){}
                else{tmpGeoJson = this.strToJson(res.data.data.productQueryList[i].imageGeo)}
                resultListFormat.push(
                  {
                    value:false,
                    advId:res.data.data.productQueryList[i].productId,
                    advName:res.data.data.productQueryList[i].productName,
                    advType:res.data.data.productQueryList[i].productType,
                    advGeoJson:tmpGeoJson,
                    advDownload:res.data.data.productQueryList[i].downloadurl,
                    advThumbUrl:res.data.data.productQueryList[i].thumbUrl,//小
                    advThumbnailUrl:res.data.data.productQueryList[i].thumbnailUrl,//大
                  }
                )
                geoJsonSelectShow.push(tmpGeoJson)
              }
              layerGroup.clearLayers()
              layerGroup.addTo(this.$refs.map.mapObject);

              this.geojsonSelectShow(geoJsonSelectShow)
              this.$store.commit('advResultsChange',resultListFormat)
            }
          })
            .catch(function (err) {
              console.log(err)
            })

        }
        if(this.$store.state.productTypeNow ===1){
          this.$store.commit('productResultChange',1)
          this.$store.commit('dialogChange',[true,'标准产品暂未开发，请重新查询'])
        }


      },//查询按钮执行函数
      geojsonSelectShow:function (geojson) {
        var length = geojson.length
        for(var i=0;i<length;i++){
          var test = L.geoJSON().addTo(this.$refs.map.mapObject);
          test.addData(geojson[i]);
          test.setStyle({"color": 'red'})
          layerGroup.addLayer(test);
        }
      },//显示用户查询结果图层
      speGeoJsonSelectShow:function (geojson) {
        spelayerGroup.clearLayers()
        spelayerGroup.addTo(this.$refs.map.mapObject);
        var length = geojson.length
        for(var i=0;i<length;i++){
          var test = L.geoJSON().addTo(this.$refs.map.mapObject);
          test.addData(geojson[i]);
          test.setStyle({"color": 'yellow'})
          spelayerGroup.addLayer(test);
        }
      },//显示专题产品用户选择结果图层
      industryFirTransform:function (n) {
        switch(n){
          case 1:
            return "农业"
            break;
          case 2:
            return "林业"
            break;
          case 3:
            return "水利"
            break;
          case 4:
            return "海洋"
            break;
          case 5:
            return "生态环保"
            break;
          case 6:
            return "国土"
            break;
          case 7:
            return "交通"
            break;
          case 8:
            return "电力"
            break;
          case 9:
            return "住建"
            break;
          case 10:
            return "城市"
            break;
          case 11:
            return "自然灾害"
            break;
          case 12:
            return "地形地貌"
            break;
          case 13:
            return "夜光"
            break;
          case 14:
            return "视频"
            break;
          case 15:
            return "其他行业"
            break;
          default:
            return "未知行业"
            break;


        }
      },
      industrySecTransform:function (n,m) {
        switch(n){
          case 1:
            switch(m){
              case 1:
                return "农业资源调查"
                break;
              case 2:
                return "作物长势"
                break;
              case 3:
                return "墒情监测/旱情评价"
                break;
              case 4:
                return "农业病虫害"
                break;
              case 5:
                return "作物品质"
                break;
              case 6:
                return "农业气象"
                break;
              case 7:
                return "农业灾害"
                break;
              case 8:
                return "作物估产"
                break;
              case 9:
                return "农业工程设施"
                break;
              case 10:
                return "农业生态环境"
                break;
              case 11:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 2:
            switch(m){
              case 1:
                return "森林类型提取"
                break;
              case 2:
                return "森林生物量/碳储量/蓄积量估算"
                break;
              case 3:
                return "森林火灾防控与预警"
                break;
              case 4:
                return "森林病虫害防治"
                break;
              case 5:
                return "野生动植物生境适宜性评价"
                break;
              case 6:
                return "自然保护区"
                break;
              case 7:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 3:
            switch(m){
              case 1:
                return "地表水资源"
                break;
              case 2:
                return "水质监测"
                break;
              case 3:
                return "水土保持"
                break;
              case 4:
                return "水深库容"
                break;
              case 5:
                return "航道提取"
                break;
              case 6:
                return "灌区"
                break;
              case 7:
                return "水利设施"
                break;
              case 8:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 4:
            switch(m){
              case 1:
                return "海洋水色监测"
                break;
              case 2:
                return "海洋灾害监测"
                break;
              case 3:
                return "海水渔业监测"
                break;
              case 4:
                return "海上目标监测"
                break;
              case 5:
                return "海岛海岸带监测"
                break;
              case 6:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 5:
            switch(m){
              case 1:
                return "水质监测"
                break;
              case 2:
                return "大气气溶胶光学厚度监测"
                break;
              case 3:
                return "生态环境评价"
                break;
              case 4:
                return "荒漠化监测"
                break;
              case 5:
                return "秸秆焚烧监测"
                break;
              case 6:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 6:
            switch(m){
              case 1:
                return "土地利用分类"
                break;
              case 2:
                return "土地督察与执法"
                break;
              case 3:
                return "矿产资源调查"
                break;
              case 4:
                return "地质灾害"
                break;
              case 5:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 7:
            switch(m){
              case 1:
                return "道路规划"
                break;
              case 2:
                return "路网监测"
                break;
              case 3:
                return "道路设施监测"
                break;
              case 4:
                return "道路灾害监测"
                break;
              case 5:
                return "航道环境监测"
                break;
              case 6:
                return "机场规划建设"
                break;
              case 7:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 8:
            switch(m){
              case 1:
                return "电网工程规划设计"
                break;
              case 2:
                return "电网工程建设施工"
                break;
              case 3:
                return "运行监测"
                break;
              case 4:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 9:
            switch(m){
              case 1:
                return "变化检测"
                break;
              case 2:
                return "违法建筑建筑执法"
                break;
              case 3:
                return "建筑特征提取"
                break;
              case 4:
                return "特定目标识别"
                break;
              case 5:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 10:
            switch(m){
              case 1:
                return "城市规划"
                break;
              case 2:
                return "园林绿地"
                break;
              case 3:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 11:
            switch(m){
              case 1:
                return "地震"
                break;
              case 2:
                return "火灾"
                break;
              case 3:
                return "洪涝"
                break;
              case 4:
                return "干旱"
                break;
              case 5:
                return "冰雹"
                break;
              case 6:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 12:
            switch(m){
              case 1:
                return "数字表面模型"
                break;
              case 2:
                return "数字高程模型"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 13:
            switch(m){
              case 1:
                return "灯光色彩分类"
                break;
              case 2:
                return "灯光强度分级"
                break;
              case 3:
                return "城市住房空置率估算"
                break;
              case 4:
                return "城市功能区划分"
                break;
              case 5:
                return "城市灯光发展指数"
                break;
              case 6:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 14:
            switch(m){
              case 1:
                return "动目标检测"
                break;
              case 2:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          case 15:
            switch(m){
              case 1:
                return "海关"
                break;
              case 2:
                return "安全"
                break;
              case 3:
                return "其他"
                break;
              default:
                return "未知"
                break;
            }
            break;
          default:
            return "未知行业"
            break;


        }
      },
      industryCombination:function (industryList) {
        var length = industryList.length
        var finalIndustry = ''
        for(var j=1;j<16;j++){
          var judge = 0
          for(var i=0;i<length;i++) {
            if(industryList[i].level1 === j){
              if(judge === 0){
                finalIndustry = finalIndustry+' '+this.industryFirTransform(industryList[i].level1)+'-'+this.industrySecTransform(industryList[i].level1,industryList[i].level2)
                judge = 1
              }
              else{
                finalIndustry =finalIndustry+','+this.industrySecTransform(industryList[i].level1,industryList[i].level2)
              }
            }
          }

        }
        return finalIndustry
      },
      industryPush:function () {
        var industry= [];
        var firIndustry = this.$store.state.selectIndustry
        var length = firIndustry.length
        for(var i=0;i<length;i++){
          switch (firIndustry[i]){
            case '农业':
              if(this.$store.state.selectNong.length!=0)
              {
                for(var i=0;i<this.$store.state.selectNong.length;i++)
                {
                  switch (this.$store.state.selectNong[i])
                  {
                    case "农业资源调查":
                      industry.push({		level1: 1, level2: 1})
                      break;
                    case "作物长势":
                      industry.push({		level1:1, level2: 2})
                      break;
                    case "墒情监测/旱情评价":
                      industry.push({		level1: 1, level2: 3})
                      break;
                    case "农业病虫害":
                      industry.push({		level1: 1, level2: 4})
                      break;
                    case "作物品质":
                      industry.push({		level1:1, level2: 5})
                      break;
                    case "农业气象":
                      industry.push({		level1: 1, level2: 6})
                      break;
                    case "农业灾害":
                      industry.push({		level1: 1, level2: 7})
                      break;
                    case "作物估产":
                      industry.push({		level1:1, level2: 8})
                      break;
                    case "农业工程设施":
                      industry.push({		level1: 1, level2: 9})
                      break;
                    case "农业生态环境":
                      industry.push({		level1:1, level2: 10})
                      break;
                    case "其他":
                      industry.push({		level1: 1, level2: 11})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 1, level2: null})
              }
              break;
            case '林业':
              if(this.$store.state.selectLin.length!=0)
              {
                for(var i=0;i<this.$store.state.selectLin.length;i++)
                {
                  switch (this.$store.state.selectLin[i])
                  {
                    case "森林类型提取":
                      industry.push({		level1: 2, level2: 1})
                      break;
                    case "森林生物量/碳储量/蓄积量估算":
                      industry.push({		level1:2, level2: 2})
                      break;
                    case "森林火灾防控与预警":
                      industry.push({		level1:2, level2: 3})
                      break;
                    case "森林病虫害防治":
                      industry.push({		level1: 2, level2: 4})
                      break;
                    case "野生动植物生境适宜性评价":
                      industry.push({		level1:2, level2: 5})
                      break;
                    case "自然保护区":
                      industry.push({		level1:2, level2: 6})
                      break;
                    case "其他":
                      industry.push({		level1:2, level2: 7})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 2, level2: null})
              }
              break;
            case '水利':
              if(this.$store.state.selectShui.length!=0)
              {
                for(var i=0;i<this.$store.state.selectShui.length;i++)
                {
                  switch (this.$store.state.selectShui[i])
                  {
                    case "地表水资源":
                      industry.push({		level1: 3, level2: 1})
                      break;
                    case "水质检测":
                      industry.push({		level1:3, level2: 2})
                      break;
                    case "水土保持":
                      industry.push({		level1:3, level2: 3})
                      break;
                    case "水深库容":
                      industry.push({		level1: 3, level2: 4})
                      break;
                    case "航道提取":
                      industry.push({		level1:3, level2: 5})
                      break;
                    case "灌区":
                      industry.push({		level1:3, level2: 6})
                      break;
                    case "水利设施":
                      industry.push({		level1:3, level2: 7})
                      break;
                    case "其他":
                      industry.push({		level1:3, level2: 8})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 3, level2: null})
              }
              break;
            case '海洋':
              if(this.$store.state.selectHai.length!=0)
              {
                for(var i=0;i<this.$store.state.selectHai.length;i++)
                {
                  switch (this.$store.state.selectHai[i])
                  {
                    case "海洋水色检测":
                      industry.push({		level1: 4, level2: 1})
                      break;
                    case "海洋灾害检测":
                      industry.push({		level1: 4, level2: 2})
                      break;
                    case "海洋渔业检测":
                      industry.push({		level1: 4, level2: 3})
                      break;
                    case "海洋目标检测":
                      industry.push({		level1: 4, level2: 4})
                      break;
                    case "海岛海岸带监测":
                      industry.push({		level1: 4, level2: 5})
                      break;
                    case "其他":
                      industry.push({		level1: 4, level2: 6})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 4, level2: null})
              }
              break;
            case '生态环保':
              if(this.$store.state.selectSheng.length!=0)
              {
                for(var i=0;i<this.$store.state.selectSheng.length;i++)
                {
                  switch (this.$store.state.selectSheng[i])
                  {
                    case "水质检测":
                      industry.push({		level1: 5, level2: 1})
                      break;
                    case "大气气溶胶光学厚度监测":
                      industry.push({		level1: 5, level2: 2})
                      break;
                    case "生态环境评价":
                      industry.push({		level1: 5, level2: 3})
                      break;
                    case "荒漠化监测":
                      industry.push({		level1: 5, level2: 4})
                      break;
                    case "秸秆焚烧检测":
                      industry.push({		level1: 5, level2: 5})
                      break;
                    case "其他":
                      industry.push({		level1: 5, level2: 6})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 5, level2: null})
              }
              break;
            case '国土':
              if(this.$store.state.selectGuo.length!=0)
              {
                for(var i=0;i<this.$store.state.selectGuo.length;i++)
                {
                  switch (this.$store.state.selectGuo[i])
                  {
                    case "土地利用分类":
                      industry.push({		level1: 6, level2: 1})
                      break;
                    case "土地督察与执法":
                      industry.push({		level1: 6, level2: 2})
                      break;
                    case "矿产资源调查":
                      industry.push({		level1: 6, level2: 3})
                      break;
                    case "地质灾害":
                      industry.push({		level1: 6, level2: 4})
                      break;
                    case "其他":
                      industry.push({		level1: 6, level2: 5})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 6, level2: null})
              }
              break;
            case '交通':
              if(this.$store.state.selectJiao.length!=0)
              {
                for(var i=0;i<this.$store.state.selectJiao.length;i++)
                {
                  switch (this.$store.state.selectJiao[i])
                  {
                    case "道路规划":
                      industry.push({		level1: 7, level2: 1})
                      break;
                    case "路网检测":
                      industry.push({		level1: 7, level2: 2})
                      break;
                    case "道路设施检测":
                      industry.push({		level1: 7, level2: 3})
                      break;
                    case "道路灾害监测":
                      industry.push({		level1: 7, level2: 4})
                      break;
                    case "航道环境检测":
                      industry.push({		level1: 7, level2: 5})
                      break;
                    case "机场规划建设":
                      industry.push({		level1: 7, level2: 6})
                      break;
                    case "其他":
                      industry.push({		level1: 7, level2: 7})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 7, level2: null})
              }
              break;
            case '电力':
              if(this.$store.state.selectDian.length!=0)
              {
                for(var i=0;i<this.$store.state.selectDian.length;i++)
                {
                  switch (this.$store.state.selectDian[i])
                  {
                    case "电网工程规划设计":
                      industry.push({		level1: 8, level2: 1})
                      break;
                    case "电网工程建设施工":
                      industry.push({		level1:8, level2: 2})
                      break;
                    case "运行监测":
                      industry.push({		level1: 8, level2: 3})
                      break;
                    case "其他":
                      industry.push({		level1: 8, level2: 4})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 8, level2: null})
              }
              break;
            case '住建':
              if(this.$store.state.selectZhu.length!=0)
              {
                for(var i=0;i<this.$store.state.selectZhu.length;i++)
                {
                  switch (this.$store.state.selectZhu[i])
                  {
                    case "变化检测":
                      industry.push({		level1: 9, level2: 1})
                      break;
                    case "违法建筑执法":
                      industry.push({		level1:9, level2: 2})
                      break;
                    case "建筑特征提取":
                      industry.push({		level1: 9, level2: 3})
                      break;
                    case "特定目标识别":
                      industry.push({		level1: 9, level2: 4})
                      break;
                    case "其他":
                      industry.push({		level1: 9, level2: 5})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 9, level2: null})
              }
              break;
            case '城市':
              if(this.$store.state.selectCheng.length!=0)
              {
                for(var i=0;i<this.$store.state.selectCheng.length;i++)
                {
                  switch (this.$store.state.selectCheng[i])
                  {
                    case "城市规划":
                      industry.push({		level1: 10, level2: 1})
                      break;
                    case "园林绿地":
                      industry.push({		level1:10, level2: 2})
                      break;
                    case "其他":
                      industry.push({		level1: 10, level2: 3})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 10, level2: null})
              }
              break;
            case '自然灾害':
              if(this.$store.state.selectZi.length!=0)
              {
                for(var i=0;i<this.$store.state.selectZi.length;i++)
                {
                  switch (this.$store.state.selectZi[i])
                  {
                    case "地震":
                      industry.push({		level1: 11, level2: 1})
                      break;
                    case "火灾":
                      industry.push({		level1:11, level2: 2})
                      break;
                    case "洪涝":
                      industry.push({		level1: 11, level2: 3})
                      break;
                    case "干旱":
                      industry.push({		level1: 11, level2: 4})
                      break;
                    case "冰雹":
                      industry.push({		level1:11, level2: 5})
                      break;
                    case "其他":
                      industry.push({		level1: 11, level2: 6})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 11, level2: null})
              }
              break;
            case '地形地貌':
              if(this.$store.state.selectDi.length!=0)
              {
                for(var i=0;i<this.$store.state.selectDi.length;i++)
                {
                  switch (this.$store.state.selectDi[i])
                  {
                    case "数字表面模型":
                      industry.push({		level1: 12, level2: 1})
                      break;
                    case "数字高程模型":
                      industry.push({		level1:12, level2: 2})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 12, level2: null})
              }
              break;
            case '夜光':
              if(this.$store.state.selectYe.length!=0)
              {
                for(var i=0;i<this.$store.state.selectYe.length;i++)
                {
                  switch (this.$store.state.selectYe[i])
                  {
                    case "灯光色彩分类":
                      industry.push({		level1: 13, level2: 1})
                      break;
                    case "灯光强度分级":
                      industry.push({		level1:13, level2: 2})
                      break;
                    case "城市住房空置率估算":
                      industry.push({		level1: 13, level2: 3})
                      break;
                    case "城市功能区划分":
                      industry.push({		level1:13, level2: 4})
                      break;
                    case "城市灯光发展指数":
                      industry.push({		level1: 13, level2: 5})
                      break;
                    case "其他":
                      industry.push({		level1:13, level2: 6})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 13, level2: null})
              }
              break;
            case '视频':
              if(this.$store.state.selectShi.length!=0)
              {
                for(var i=0;i<this.$store.state.selectShi.length;i++)
                {
                  switch (this.$store.state.selectShi[i])
                  {
                    case "动目标检测":
                      industry.push({		level1: 14, level2: 1})
                      break;
                    case "其他":
                      industry.push({		level1:14, level2: 2})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 14, level2: null})
              }
              break;
            case '其他行业':
              if(this.$store.state.selectQi.length!=0)
              {
                for(var i=0;i<this.$store.state.selectQi.length;i++)
                {
                  switch (this.$store.state.selectQi[i])
                  {
                    case "海关":
                      industry.push({		level1: 15, level2: 1})
                      break;
                    case "安全":
                      industry.push({		level1: 15, level2: 2})
                      break;
                    case "其他":
                      industry.push({		level1: 15, level2: 3})
                      break;
                  }
                }
              }
              else {
                industry.push({		level1: 15, level2: null})
              }
              break;
          }
        }
        return industry
      },
      movetest:function () {
        var test1 = L.geoJSON().addTo(this.$refs.map.mapObject);
        var test2 = L.geoJSON().addTo(this.$refs.map.mapObject);
        var geojson = '{\"type\":\"MultiPolygon\",\"coordinates\":[[[[117.04735,30.663843],[117.03827,30.656578],[117.04543,30.599014],[117.011795,30.589397],[116.961044,30.559563],[116.973274,30.53876],[117.01734,30.513844],[117.01734,30.503843],[117.00735,30.503843],[117.00735,30.493843],[116.9983,30.480747],[116.963264,30.457928],[116.88326,30.437693],[116.891426,30.377928],[116.89735,30.353844],[116.867,30.370834],[116.84292,30.429667],[116.82234,30.426626],[116.801956,30.42964],[116.76549,30.407639],[116.74997,30.409935],[116.753174,30.388237],[116.67314,30.371351],[116.6594,30.353552],[116.63274,30.369638],[116.622345,30.368103],[116.58298,30.37392],[116.542206,30.357893],[116.509346,30.377718],[116.48734,30.383842],[116.494804,30.398844],[116.480705,30.427202],[116.47735,30.463842],[116.4818,30.469397],[116.54075,30.482151],[116.59843,30.474976],[116.61631,30.45265],[116.645164,30.521141],[116.64172,30.548843],[116.64404,30.567457],[116.60388,30.635767],[116.6875,30.699402],[116.71179,30.739397],[116.753296,30.796211],[116.75166,30.809298],[116.76289,30.818289],[116.76734,30.823843],[116.80567,30.808775],[116.90299,30.799488],[116.9217,30.788198],[116.95169,30.775923],[116.98479,30.75038],[116.98153,30.728329],[117.03299,30.689487],[117.04735,30.663843]],[[116.92535,30.637693],[116.96735,30.633842],[116.96399,30.660484],[116.91399,30.66096],[116.92535,30.637693]]]]}'
        var geojson1 = '{\"type\":\"MultiPolygon\",\"coordinates\":[[[[116.615814,31.074543],[116.65233,31.056395],[116.66893,31.064499],[116.690704,31.047203],[116.707344,31.043842],[116.711426,31.017927],[116.724266,30.987354],[116.709175,30.947012],[116.67891,30.900537],[116.70142,30.867928],[116.713264,30.859758],[116.72767,30.838892],[116.76326,30.829758],[116.76734,30.823843],[116.76289,30.818289],[116.75166,30.809298],[116.753296,30.796211],[116.71179,30.739397],[116.6875,30.699402],[116.60388,30.635767],[116.64404,30.567457],[116.64172,30.548843],[116.645164,30.521141],[116.61631,30.45265],[116.59843,30.474976],[116.54075,30.482151],[116.4818,30.469397],[116.47735,30.463842],[116.43888,30.470379],[116.44314,30.499233],[116.426796,30.526323],[116.43399,30.574984],[116.373474,30.599749],[116.32983,30.593298],[116.29445,30.614637],[116.28299,30.629488],[116.259384,30.647705],[116.23734,30.653843],[116.271835,30.696915],[116.29234,30.699465],[116.30607,30.69776],[116.342896,30.708288],[116.3518,30.739412],[116.401794,30.779398],[116.4335,30.792759],[116.454834,30.80984],[116.4229,30.835413],[116.43179,30.849398],[116.45124,30.864971],[116.452965,30.878843],[116.45048,30.898844],[116.452965,30.918842],[116.45167,30.929306],[116.49826,30.962055],[116.51253,31.01198],[116.52734,31.023844],[116.54949,31.028313],[116.56071,31.050484],[116.59399,31.057203],[116.615814,31.074543]]]]}'
        geojson = this.strToJson(geojson)
        geojson1 = this.strToJson(geojson1)
        test1.addData(geojson);
        test2.addData(geojson1);
        test1.setStyle({"color": 'black'})
        layerGroup.addTo(this.$refs.map.mapObject);
        layerGroup.addLayer(test1);
        layerGroup.addLayer(test2);
      },
      removetest:function () {
        this.$refs.map.mapObject.clearLayers();
      },
      zoomControl:function () {
        this.$refs.map.mapObject.zoomControl = false
      },
    },
    mounted(){
      this.$nextTick(() => {
        this.map = this.$refs.map.mapObject// work as expected
      })
      this.zoomControl()
    },
    computed:{
      centerDataC:function () {
        return this.$store.state.centerData
      },
      centerNowC:function () {
        return this.$store.state.centerData
      },
      rectangleDataC:function () {
        return this.$store.state.coordinateData
      },
      zoomDataC:function () {
        return this.$store.state.zoomData
      },
      zoomNowC:function () {
        return this.zoom
      },
      circleDataC:function () {
        return this.$store.state.circleData
      },
      polygonDataC:function () {
        return this.$store.state.polygonData
      },
      geoJsonC:function () {
        return this.$store.state.geoJsonNow
      },
      getSendJsonC:function () {
        return this.$store.state.sendJson
      },
      speGeoJsonSelectC:function () {
        return this.$store.state.speGeoJsonSelect
      },
      mapResetC:function () {
        return this.$store.state.mapReset
      },
      drawAreaC:function () {
        return this.$store.state.drawAreaId
      },
      advUrlAndJsonC:function () {
        return this.$store.state.advUrlAndJsonNow
      },
      advPageC:function () {
        return this.$store.state.advPageNow
      },
      spePageC:function () {
        return this.$store.state.spePageNow
      },
      dialogC:function () {
        return this.$store.state.dialog
      },

    },
  }
</script>

<style scoped>

</style>
