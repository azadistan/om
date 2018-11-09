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
          <div style="float:left;width: 5.1rem;height:3.5rem;margin-left: 3.5rem">
            <v-text-field height="16px"
                          label="左上精度"
            ></v-text-field>
          </div>
          <div style="float:left;width: 5.1rem;height:3.5rem;margin-left: 1.5rem">
            <v-text-field height="16px"
                          label="左上纬度"
            ></v-text-field>
          </div>
        </div>
        <div style="float:bottom;width: 18.8rem;height:3.5rem;">
          <div style="float:left;width: 5.1rem;height:4.4rem;margin-left: 3.5rem">
            <v-text-field height="16px"
                          label="右上精度"
            ></v-text-field>
          </div>
          <div style="float:left;width: 5.1rem;height:4.4rem;margin-left: 1.5rem">
            <v-text-field height="16px"
                          label="右上纬度"
            ></v-text-field>
          </div>
        </div>

      </div>
      <div id="tude2" style="float:bottom;width:18.8rem;height:3.4rem;">
          <v-btn style="margin-top: -1rem;margin-left: 2.3rem" flat color="primary">确认</v-btn>
          <v-btn style="margin-top: -1rem" flat color="primary">重置</v-btn>
      </div>
      <div id="tude3" style="width:18.8rem;height:7rem;display: none;">
        <div style="float:bottom;width:18.8rem;height:3.5rem;margin-top: 1rem">
          <div style="float:left;width: 6.4rem;height:3.5rem;margin-left: 2.5rem">
            <v-text-field height="16px"
                          label="中心点精度"
            ></v-text-field>
          </div>
          <div style="float:left;width: 6.4rem;height:3.5rem;margin-left: 1.5rem">
            <v-text-field height="16px"
                          label="中心点纬度"
            ></v-text-field>
          </div>
        </div>
        <div style="float:bottom;width: 18.8rem;height:3.5rem;">
          <div style="float:left;width: 6rem;height:4.4rem;margin-left: 2.8rem">
            <v-text-field height="16px"
                          label="长度(公里)"
            ></v-text-field>
          </div>
          <div style="float:left;width: 6rem;height:4.4rem;margin-left: 1.5rem">
            <v-text-field height="16px"
                          label="宽度(公里)"
            ></v-text-field>
          </div>
        </div>
      </div>
      <div id="tude4" style="width:18.8rem;height:3.4rem;display: none;">
        <v-btn style="margin-top: -1rem;margin-left: 2.3rem" flat color="primary">确认</v-btn>
        <v-btn style="margin-top: -1rem" flat color="primary">重置</v-btn>
      </div>
      <div id="tude5" style="width:18.8rem;height:7rem;display: none;">
        <div style="float:bottom;width:18.8rem;height:3.5rem;margin-top: 1rem">
          <div style="float:left;width: 6.4rem;height:3.5rem;margin-left: 2.5rem">
            <v-text-field height="16px"
                          label="中心点精度"
            ></v-text-field>
          </div>
          <div style="float:left;width: 6.4rem;height:3.5rem;margin-left: 1.5rem">
            <v-text-field height="16px"
                          label="中心点纬度"
            ></v-text-field>
          </div>
        </div>
        <div style="float:bottom;width: 18.8rem;height:3.5rem;">
          <div style="float:left;width: 6rem;height:4.4rem;margin-left: 2.8rem">
            <v-text-field height="16px"
                          label="半径(公里)"
            ></v-text-field>
          </div>
          <div style="float:left;width: 6rem;height:4.4rem;margin-left: 1.5rem">

          </div>
        </div>
      </div>
      <div id="tude6" style="width:18.8rem;height:3.4rem;display: none;">
        <v-btn style="margin-top: -1rem;margin-left: 2.3rem" flat color="primary">确认</v-btn>
        <v-btn style="margin-top: -1rem" flat color="primary">重置</v-btn>
      </div>
      <div id="tude7" style="width:18.8rem;height:8.8rem;display: none;">
        <v-textarea
          name="input-7-1"
          label="坐标系"
          placeholder="请输入坐标，请严格按照坐标点用英文都分好格，经纬度用空格分隔的格式输入"
          value=""
          clearable
        ></v-textarea>
      </div>
      <div id="tude8" style="width:18.8rem;height:3.4rem;display: none;">
        <v-btn style="margin-top: 0rem;margin-left: 2.3rem" flat color="primary">确认</v-btn>
        <v-btn style="margin-top: 0rem" flat color="primary">重置</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pm-latitude',
    data () {
      return {
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

      }
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
      }
    }
  }
</script>

<style scoped>

</style>
