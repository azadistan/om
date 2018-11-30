<template>
  <div style="width:26.25rem;height:12.1rem;margin:0px 0 2px 0px;float: bottom;border-top:#e0e0e0 solid 1px;">
    <div style="float:left;width:6.2rem;height:12.2rem;border:1px black">
      <v-navigation-drawer
      >
        <v-list dense>
          <v-list-tile
            v-for="position in positions"
            :key="position.title"
            v-model="position.active"
            @click="positionShow(position.title)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ position.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </div>
    <div style="float:left;width:18.8rem;height:12.2rem;margin-left: 0.25rem">
      <div id="tude1" style="float:bottom;width:18.8rem;height:7rem;">
        <div style="float:bottom;width:18.8rem;height:3.5rem;margin-top: 1rem">
          <div style="float:left;width: 5.1rem;height:3.5rem;margin-left: 4rem">
            <v-text-field height="16px"
                          label="左上经度"
                          :value=leftUpLongitude
                          v-model=leftUpLongitude
                          type="number"
            ></v-text-field>
          </div>
          <div style="float:left;width: 5.1rem;height:3.5rem;margin-left: 1.5rem">
            <v-text-field height="16px"
                          label="左上纬度"
                          :value=leftUpLatitude
                          v-model=leftUpLatitude
                          type="number"
            ></v-text-field>
          </div>
        </div>
        <div style="float:bottom;width: 18.8rem;height:3.5rem;">
          <div style="float:left;width: 5.1rem;height:4.4rem;margin-left: 4rem">
            <v-text-field height="16px"
                          label="右下经度"
                          :value=RightDownLongitude
                          v-model=RightDownLongitude
                          type="number"
            ></v-text-field>
          </div>
          <div style="float:left;width: 5.1rem;height:4.4rem;margin-left: 1.5rem">
            <v-text-field height="16px"
                          label="右下纬度"
                          :value=RightDownLatitude
                          v-model=RightDownLatitude
                          type="number"
            ></v-text-field>
          </div>
        </div>
      </div>
      <div id="tude2" style="float:bottom;width:18.8rem;height:3.4rem;">
          <v-btn @click="leftUpRightDownConfirm()" style="margin-top: -1rem;margin-left: 2.7rem" flat color="primary">确认</v-btn>
          <v-btn @click="leftUpRightDownReset()"style="margin-top: -1rem" flat color="primary">重置</v-btn>
      </div>
      <div id="tude3" style="width:18.8rem;height:7rem;display: none;">
        <div style="float:bottom;width:18.8rem;height:3.5rem;margin-top: 1rem">
          <div style="float:left;width: 6.4rem;height:3.5rem;margin-left: 2.5rem">
            <v-text-field height="16px"
                          label="中心点经度"
                          :value=center1Longitude
                          v-model=center1Longitude
                          type="number"
            ></v-text-field>
          </div>
          <div style="float:left;width: 6.4rem;height:3.5rem;margin-left: 1.5rem">
            <v-text-field height="16px"
                          label="中心点纬度"
                          :value=center1Latitude
                          v-model=center1Latitude
                          type="number"
            ></v-text-field>
          </div>
        </div>
        <div style="float:bottom;width: 18.8rem;height:3.5rem;">
          <div style="float:left;width: 6rem;height:4.4rem;margin-left: 2.8rem">
            <v-text-field height="16px"
                          label="长度(公里)"
                          :value=center1Length
                          v-model=center1Length
                          type="number"
            ></v-text-field>
          </div>
          <div style="float:left;width: 6rem;height:4.4rem;margin-left: 1.5rem">
            <v-text-field height="16px"
                          label="宽度(公里)"
                          :value=center1Width
                          v-model=center1Width
                          type="number"
            ></v-text-field>
          </div>
        </div>
      </div>
      <div id="tude4" style="width:18.8rem;height:3.4rem;display: none;">
        <v-btn  @click="center1Confirm()" style="margin-top: -1rem;margin-left: 2.7rem" flat color="primary">确认</v-btn>
        <v-btn  @click="center1Reset()" style="margin-top: -1rem" flat color="primary">重置</v-btn>
      </div>
      <div id="tude5" style="width:18.8rem;height:7rem;display: none;">
        <div style="float:bottom;width:18.8rem;height:3.5rem;margin-top: 1rem">
          <div style="float:left;width: 6.4rem;height:3.5rem;margin-left: 2.5rem">
            <v-text-field height="16px"
                          label="中心点经度"
                          :value=center2Longitude
                          v-model=center2Longitude
                          type="number"
            ></v-text-field>
          </div>
          <div style="float:left;width: 6.4rem;height:3.5rem;margin-left: 1.5rem">
            <v-text-field height="16px"
                          label="中心点纬度"
                          :value=center2Latitude
                          v-model=center2Latitude
                          type="number"
            ></v-text-field>
          </div>
        </div>
        <div style="float:bottom;width: 18.8rem;height:3.5rem;">
          <div style="float:left;width: 6rem;height:4.4rem;margin-left: 2.8rem">
            <v-text-field height="16px"
                          label="半径(公里)"
                          :value=center2Radius
                          v-model=center2Radius
                          type="number"
            ></v-text-field>
          </div>
          <div style="float:left;width: 6rem;height:4.4rem;margin-left: 1.5rem">

          </div>
        </div>
      </div>
      <div id="tude6" style="width:18.8rem;height:3.4rem;display: none;">
        <v-btn @click="center2Confirm()" style="margin-top: -1rem;margin-left: 2.7rem" flat color="primary">确认</v-btn>
        <v-btn  @click="center2Reset()" style="margin-top: -1rem" flat color="primary">重置</v-btn>
      </div>
      <div id="tude7" style="width:18.8rem;height:8.8rem;display: none;">
        <v-textarea
          name="input-7-1"
          label="坐标系"
          placeholder="请输入坐标，请严格按照坐标点用英文都分好格，经纬度用空格分隔的格式输入。例：119.0,40.6 118.1,39.4 114.1,38.4"
          :value=coordinateSystem
          v-model=coordinateSystem
          type="number"
          no-resize="true"
        ></v-textarea>
      </div>
      <div id="tude8" style="width:18.8rem;height:3.4rem;display: none;">
        <v-btn @click="coordinateSystemConfirm()"style="margin-top: 0rem;margin-left: 2.7rem" flat color="primary">确认</v-btn>
        <v-btn @click="coordinateSystemReset()"style="margin-top: 0rem" flat color="primary">重置</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pm-latitude',
    data () {
      return {
        leftUpLongitude:'',
        leftUpLatitude:'',
        RightDownLongitude:'',
        RightDownLatitude:'',
        center1Longitude:'',
        center1Latitude:'',
        center1Length:'',
        center1Width:'',
        center2Longitude:'',
        center2Latitude:'',
        center2Radius:'',
        coordinateSystem:'',
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        positions: [
          { title: '左上右下'},
          { title: '中心点1'},
          { title: '中心点2'},
          { title: '坐标系'}
        ]
      }
    },
    methods:{
      positionShow(position){
        switch (position) {
          case '左上右下':
            this.$store.commit('listNumChange',1)
            break;
          case "中心点1":
            this.$store.commit('listNumChange',2)
            break;
          case "中心点2":
            this.$store.commit('listNumChange',3)
            break;
          case "坐标系":
            this.$store.commit('listNumChange',4)
            break;
          default:
            this.$store.commit('listNumChange',5)
            break;
        }
      },
      leftUpRightDownConfirm:function () {
        var longitude1 =  parseFloat (this.leftUpLongitude);
        var longitude2 =  parseFloat (this.RightDownLongitude);
        var latitude1 =  parseFloat (this.leftUpLatitude);
        var latitude2 =  parseFloat (this.RightDownLatitude);
        if(longitude1<180 && longitude1>-180 && longitude2<180 && longitude2>-180 && latitude1<90 && latitude1>-90 && latitude2<90 && latitude2>-90)
        {
          this.$store.commit('coordinateDataChange',[latitude1,longitude1,latitude2,longitude2])
          this.$store.commit('mapResetChange',0)
        }
        else{
          this.$store.commit('dialogChange',[true,'输入不合法，请重新输入'])
        }
      },
      leftUpRightDownReset:function () {
        this.leftUpLongitude=""
        this.RightDownLongitude=""
        this.leftUpLatitude=""
        this.RightDownLatitude=""
        this.$store.commit('mapResetChange',1)
      },
      center1Confirm:function (){
        var center1Longitude = parseFloat (this.center1Longitude);
        var center1Latitude = parseFloat (this.center1Latitude);
        var center1Length = parseFloat (this.center1Length);
        var center1Width = parseFloat (this.center1Width);
        if(center1Longitude<180 && center1Longitude>-180 && center1Latitude<90 && center1Latitude>-90 && center1Length>0 && center1Width>0)
        {var center1Longitude1 = center1Longitude + center1Length/(222*Math.cos(center1Latitude))
        var center1Longitude2 = center1Longitude - center1Length/(222*Math.cos(center1Latitude))
        var center1Latitude1 = center1Latitude + center1Width/222
        var center1Latitude2 = center1Latitude - center1Width/222
        this.$store.commit('coordinateDataChange',[center1Latitude1,center1Longitude1,center1Latitude2,center1Longitude2])
        this.$store.commit('mapResetChange',0)}
        else{
          this.$store.commit('dialogChange',[true,'输入不合法，请重新输入'])
        }
      },
      center1Reset:function (){
        this.center1Longitude=""
        this.center1Latitude=""
        this.center1Length=""
        this.center1Width=""
        this.$store.commit('coordinateDataChange',['','','',''])
        this.$store.commit('mapResetChange',1)
      },
      center2Confirm:function (){
        var center2Longitude = parseFloat (this.center2Longitude);
        var center2Latitude = parseFloat (this.center2Latitude);
        var center2Radius = parseFloat (this.center2Radius);
        if(center2Longitude<180 && center2Longitude>-180 && center2Latitude<90 && center2Latitude>-90 && center2Radius>0){
        this.$store.commit('circleDataChange',[center2Latitude,center2Longitude,center2Radius])
        this.$store.commit('mapResetChange',0)
        }
        else{
          this.$store.commit('dialogChange',[true,'输入不合法，请重新输入'])
        }
      },
      center2Reset:function (){
        this.center2Longitude = ''
        this.center2Latitude = ''
        this.center2Radius = ''
        this.$store.commit('mapResetChange',1)
      },
      coordinateSystemConfirm:function (){
        var judgeTmp = 0
        var finalArr = []
        var totalLong = 0
        var totalLati = 0
        var maxLong = 0
        var minLong = 180
        var maxLati = 0
        var minLati = 90
        var str = this.coordinateSystem
        var arr = str.split(" ");
        var length = arr.length
        for(var i=0;i<length;i++){
          var arr1 = arr[i].split(",")
          if(isNaN(arr1[0]) === false && isNaN(arr1[1]) ===false && arr1[0]<180 && arr1[0]>-180 && arr1[1]>-90 && arr1[1]<90){
          var tmp = parseFloat (arr1[0])
          arr1[0] = parseFloat (arr1[1])
          arr1[1] = tmp
            if(arr1[1]>maxLong){maxLong = arr1[1]}
            if(arr1[1]<minLong){minLong = arr1[1]}
            if(arr1[0]>maxLati){maxLati = arr1[0]}
            if(arr1[0]<minLati){minLati = arr1[0]}
          totalLong = totalLong + arr1[1]
          totalLati = totalLati + arr1[0]
          finalArr.push(arr1)}
          else{
            this.$store.commit('dialogChange',[true,'输入不合法，请重新输入'])
            judgeTmp =1
          }
        }
        if(judgeTmp === 0){
          var distance = this.getDistance(maxLati,maxLong,minLati,minLong)
          var finalLong = totalLong/length
          var finalLati = totalLati/length
          if(isNaN(finalLong) === false && isNaN(finalLong) ===false ){
            this.$store.commit('polygonDataChange',finalArr)
            this.$store.commit('mapResetChange',0)
          }
          else{
            this.$store.commit('dialogChange',[true,'输入不合法，请重新输入'])
          }
        }
      },
      coordinateSystemReset:function (){
        this.coordinateSystem=''
        this.$store.commit('mapResetChange',1)
      },
      getZoom:function (distance) {
        var zoom = ["50","100","200","500","1000","2000","5000","10000","20000","25000","50000","100000","200000","500000","1000000","2000000"]
        for (var i = 0,zoomLen = zoom.length; i < zoomLen; i++) {
          if(zoom[i] - distance > 0){
            return 11-i
          }
        }
      },
      rad:function (d) {
        return d * Math.PI / 180.0;
      },
      getDistance:function (lat1,long1,lat2,long2) {
        var EARTH_RADIUS = 6378.137;
        var a, b, d, sa2, sb2;
        lat1 = this.rad(lat1);
        lat2 = this.rad(lat2);
        a = lat1 - lat2;
        b = this.rad(long1 - long2);
        sa2 = Math.sin(a / 2.0);
        sb2 = Math.sin(b / 2.0);
        d = 2   * EARTH_RADIUS
          * Math.asin(Math.sqrt(sa2 * sa2 + Math.cos(lat1)
            * Math.cos(lat2) * sb2 * sb2));
        return d;
      },

    },
    watch:{
      listChange: {
        handler () {
          switch (this.$store.state.listNum) {
            case 1:
              document.getElementById('tude1').style.display=''
              document.getElementById('tude2').style.display=''
              document.getElementById('tude3').style.display='none'
              document.getElementById('tude4').style.display='none'
              document.getElementById('tude5').style.display='none'
              document.getElementById('tude6').style.display='none'
              document.getElementById('tude7').style.display='none'
              document.getElementById('tude8').style.display='none'
              this.$store.commit('listNumChange',0)
              break;
            case 2:
              document.getElementById('tude1').style.display='none'
              document.getElementById('tude2').style.display='none'
              document.getElementById('tude3').style.display=''
              document.getElementById('tude4').style.display=''
              document.getElementById('tude5').style.display='none'
              document.getElementById('tude6').style.display='none'
              document.getElementById('tude7').style.display='none'
              document.getElementById('tude8').style.display='none'
              this.$store.commit('listNumChange',0)
              break;
            case 3:
              document.getElementById('tude1').style.display='none'
              document.getElementById('tude2').style.display='none'
              document.getElementById('tude3').style.display='none'
              document.getElementById('tude4').style.display='none'
              document.getElementById('tude5').style.display=''
              document.getElementById('tude6').style.display=''
              document.getElementById('tude7').style.display='none'
              document.getElementById('tude8').style.display='none'
              this.$store.commit('listNumChange',0)
              break;
            case 4:
              document.getElementById('tude1').style.display='none'
              document.getElementById('tude2').style.display='none'
              document.getElementById('tude3').style.display='none'
              document.getElementById('tude4').style.display='none'
              document.getElementById('tude5').style.display='none'
              document.getElementById('tude6').style.display='none'
              document.getElementById('tude7').style.display=''
              document.getElementById('tude8').style.display=''
              this.$store.commit('listNumChange',0)
              break;
            default:
              break;
          }
        },
        deep: true
      },
    },
    created () {
    },
    computed:{
      listChange:function () {
        return this.$store.state.listNum
      },
    },

  }
</script>

<style scoped>

</style>
