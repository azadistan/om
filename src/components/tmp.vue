<template>
  <div  style="width: 52rem;min-height: 48rem; margin-left: 2.3rem;margin-top:10rem;background:#FFF;text-align:center" >
    <div style="width: 50rem;height:1rem;margin-left: 2rem;background:#FFF;text-align:center"></div>
    <v-toolbar color="white" class="elevation-1 mt-2" style="width: 48rem;margin-left: 2rem">
      <v-toolbar-title>专题基本信息</v-toolbar-title>
      <v-spacer ></v-spacer>
    </v-toolbar>
    <div class="elevation-1" style="width:48rem;margin-left: 2rem">

      <div>
        <v-textarea name="input-7-1" label="请输入专题描述" v-model="productDescription" value="" rows="1" style="margin-left:4rem;margin-top: 0rem;width:40rem;"></v-textarea>
      </div>
      <div class="term-text" style="margin-left:-3rem;color:#FFFFFF; margin-top:1.3rem;font-size:1.2rem;font-family:'微软雅黑'"><span style="color: #FFFFFF;">* </span></div>
      <v-layout    row>
        <v-flex xs12 sm9 md5>
          <v-text-field v-model="selectDeliveryObject" @blur="blurDeliveryObject" @change="selectDeliveryObjectChange" style="width:40rem;" label="请输入或选择交付对象"></v-text-field>
        </v-flex>
        <v-flex xs12 sm9 md5>
          <v-select  v-model="selectDeliveryObject1" @blur="blurDeliveryObject1"  @mousedown="mousedownDeliveryObject1" @change="selectDeliveryObjectChange1"
                     style="margin-left: 19.5rem; width:0.1rem;" :items="itemsDeliveryObject" label=""></v-select>
        </v-flex>
      </v-layout>

      <div class="term-text" style="margin-left:-3rem;color:#FFFFFF; margin-top:1.3rem;font-size:1.2rem;font-family:'微软雅黑'"><span style="color: #FFFFFF;">* </span></div>
      <v-layout    row>
        <v-flex xs12 sm9 md5>
          <v-text-field v-model="selectServiceObject" @blur="blurServiceObject" @change="selectServiceObjectChange" style="width:40rem;" label="请输入或选择服务对象"></v-text-field>
        </v-flex>
        <v-flex xs12 sm9 md5>
          <v-select  v-model="selectServiceObject1" @blur="blurServiceObject1"  @mousedown="mousedownServiceObject1" @change="selectServiceObjectChange1"
                     style="margin-left: 19.5rem; width:0.1rem;" :items="itemsServiceObject" label=""></v-select>
        </v-flex>
      </v-layout>
      <v-layout    row>
        <div class="term-text" style="margin-left:-3rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑'"><span style="color: #FFFFFF;">* </span></div>


        <v-flex xs12 sm9 md5>
          <v-menu v-model="menu2" :close-on-content-click="false" full-width max-width="290">
            <v-text-field slot="activator" v-model="date"  label="选择交付日期" readonly></v-text-field>
            <v-date-picker v-model="date" locale="zh-cn" @change="menu2 = false"></v-date-picker>
          </v-menu>
          <!--
                      <v-menu  :close-on-content-click="false" v-model="menu2" :nudge-right="40"  lazy transition="scale-transition" offset-y full-width min-width="290px">
                        <v-text-field clearable slot="activator" v-model="date"  label="选择交付日期" prepend-icon="event" readonly></v-text-field>
                        <v-date-picker v-model="date" locale="zh-cn"  @input="menu2 = false"></v-date-picker>
                      </v-menu>
                      -->
        </v-flex>
        <v-flex xs12 sm9 md5>
          <v-menu ref="menu" :close-on-content-click="false" v-model="menu3" :nudge-right="40" :return-value.sync="time" lazy transition="scale-transition"
                  offset-y full-width max-width="290px" min-width="290px">
            <v-text-field slot="activator" v-model="time" label="选择交付时间" prepend-icon="access_time" readonly
            ></v-text-field>
            <v-time-picker v-if="menu3" v-model="time" full-width @change="$refs.menu.save(time)"></v-time-picker>
          </v-menu>
        </v-flex>
      </v-layout>

      <div style="margin-top: 0rem">
        <div class="term-text2" style="margin-left: 2.5rem" ><span style="color: #ff0000;">* </span></div>

        <v-combobox :error="industryError"  style="margin-top: 0rem;width:40rem;"  v-model="select" :items="items" label="选择一级行业" multiple chips @change="aa">
          <template slot="selection" slot-scope="data">
            <v-chip  :selected="data.selected" :disabled="data.disabled" :key="JSON.stringify(data.item)" class="v-chip--select-multi"   @input="data.parent.selectItem(data.item)">
              <v-avatar  class="accent white--text"  v-text="data.item.slice(0, 1).toUpperCase()"></v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>

        <div v-show="nong" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/nong.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox  style="width:35.25rem;margin-top: 0rem" v-model="selectNong" :items="itemsNong" label="选择农业二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="lin" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/lin.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectLin" :items="itemsLin" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="shui" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/shui.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectShui" :items="itemsShui" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="hai" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/hai.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectHai" :items="itemsHai" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="sheng" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/sheng.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectSheng" :items="itemsSheng" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="guo" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/guo.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectGuo" :items="itemsGuo" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="jiao" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/jiao.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectJiao" :items="itemsJiao" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="dian" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/dian.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectDian" :items="itemsDian" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="zhu" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/zhu.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectZhu" :items="itemsZhu" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="cheng" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/cheng.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectCheng" :items="itemsCheng" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="zi" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/zi.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectZi" :items="itemsZi" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="di" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/di.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectDi" :items="itemsDi" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="ye" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/ye.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectYe" :items="itemsYe" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="shi" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/shi.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectShi" :items="itemsShi" label="选择二级行业" multiple chips></v-combobox>
        </div>
        <div v-show="qi" >
          <div class="term-text" style="margin-left: 1.6rem;color:#FFFFFF;font-size:1.2rem;font-family:'微软雅黑'"><img src="../assets/qi.png" style="width:2.5rem;margin-top:0rem" /></div>
          <v-combobox style="width:35.25rem;margin-top: 0rem" v-model="selectQi" :items="itemsQi" item-value="itemsQi1" label="选择二级行业" multiple chips></v-combobox>
        </div>
      </div>



    </div>
    <!--   <hr style="border:1px dashed #C0C0C0; height:1px;width: 50rem;margin-left: 8rem">
       <v-expansion-panel v-model="panel" expand>
         <v-expansion-panel-content
           v-for="(item,i) in this.$store.state.fileInfo.directory.length"
           :key="i"
         >
           <div slot="header">{{this.$store.state.fileInfo.directory[i].singleTempId}}</div>
           <v-card>
             <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
           </v-card>
         </v-expansion-panel-content>
       </v-expansion-panel>

       <div class="text-xs-center mb-3">{{ panel }}</div>
       -->
    <div v-show=!show1>
      <v-toolbar color="white" class="elevation-1 mt-2" style="margin-top: 15rem;width: 48rem;margin-left: 2rem">
        <v-toolbar-title>多期产品信息</v-toolbar-title>
        <v-spacer ></v-spacer>
      </v-toolbar>
      <v-expansion-panel  v-model="panel" expand v-if=infoShow style=" margin-left:2rem;width:48rem">
        <v-expansion-panel-content v-for="(item,i) in $store.state.fileInfo.directory.length" :key="i">
          <div slot="header">{{$store.state.fileInfo.directory[i].directoryName}}</div>

          <!--
                   <v-expansion-panel  style="margin-top: 2rem;margin-left:8rem;width:50rem">
                     <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
                       <div slot="header">{{$store.state.fileInfo.directory[i].singleTempId}}</div>
                    -->
          <div class="term-text1" ><span style="margin-left: 2.2rem;color: #ff0000;">* </span></div>

          <v-select  :items="itemsSatellite" v-model=Satellite[i] :error=satelliteErrors[i] label="选择采集卫星" style="margin-left: 4rem;width:40rem;"></v-select>

          <div class="term-text1" ><span style="margin-left: 2.2rem;color: #ff0000;">* </span></div>

          <v-select :items="itemsSensor" v-model=Sensor[i] label="选择传感器" style="margin-left: 4rem;width:40rem;"></v-select>

          <div class="term-text1" style="font-size:1.2rem;font-family:'微软雅黑'"><span style="margin-left: 2.2rem;color: #ff0000;">* </span></div>
          <v-layout sm9 md5   row>

            <v-menu v-model=datemenu[i] style="margin-left: 2rem;width: 20rem"  :close-on-content-click="false" full-width max-width="290">
              <v-text-field slot="activator" v-model=date1[i]  label="选择采集日期" readonly></v-text-field>
              <v-date-picker v-model=date1[i] locale="zh-cn" @input="datemenu[i] = false"></v-date-picker>
            </v-menu>
            <!--
                          <v-menu  :close-on-content-click="false" style="width: 23rem" v-model=datemenu[i] :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                            <v-text-field slot="activator" v-model=date1[i] label="选择采集日期" prepend-icon="event" readonly></v-text-field>
                            <v-date-picker v-model=date1[i] locale="zh-cn" @input="datemenu[i] = false"></v-date-picker>
                          </v-menu>


                                    <v-menu  ref="menu1" :close-on-content-click="false" v-model=timemenu[i] :nudge-right="40" :return-value.sync=time1[i] lazy transition="scale-transition"
                                            offset-y full-width max-width="290px" min-width="290px" style="width: 22rem">
                                      <v-text-field slot="activator" v-model=time1[i] label="选择采集时间" prepend-icon="access_time" readonly
                                      ></v-text-field>
                                      <v-time-picker v-if=timemenu[i] v-model=time1[i] full-width @change="$refs.menu1.save(time1[i])"></v-time-picker>
                                    </v-menu>

                       <v-menu ref="menu1" :close-on-content-click="false" v-model="menu4" :nudge-right="40" :return-value.sync="time1" lazy transition="scale-transition"
                                          offset-y full-width max-width="290px" min-width="290px">
                                    <v-text-field slot="activator" v-model="time1" label="选择交付时间" prepend-icon="access_time" readonly
                                    ></v-text-field>
                                    <v-time-picker v-if="menu4" v-model="time1" full-width @change="$refs.menu1.save(time1)"></v-time-picker>
                                  </v-menu>
            -->
            <v-menu ref="menu1" :close-on-content-click="false" v-model=timemenu[i] :nudge-right="40" :return-value.sync=time1[i] lazy transition="scale-transition"
                    offset-y full-width max-width="290px" min-width="290px" style="width: 20rem">
              <v-text-field slot="activator" v-model=time1[i] label="选择采集时间" prepend-icon="access_time" readonly
              ></v-text-field>
              <v-time-picker v-if=timemenu[i]   v-model=time1[i] full-width @change="$refs.menu1[i].save(time1[i])"></v-time-picker>
            </v-menu>

          </v-layout>
          <div class="term-text1" ><span style="margin-left: 2.2rem;color: #ff0000;">* </span></div>

          <v-text-field v-model=productionPersonnel[i] :rules="[rules.required]" style="margin-left: 4rem;width:40rem;" label="生产人员"></v-text-field>
          <div class="term-text1" ><span style="margin-left: 2.2rem;color: #ff0000;">* </span></div>

          <v-menu v-model=datemenu1[i] style="margin-left: 4rem;width: 40rem"  :close-on-content-click="false" full-width max-width="290">
            <v-text-field slot="activator" v-model=date2[i]  label="选择采集日期" readonly></v-text-field>
            <v-date-picker v-model=date2[i] locale="zh-cn"@input="datemenu1[i] = false"></v-date-picker>
          </v-menu>


        </v-expansion-panel-content>
      </v-expansion-panel>

      <div class="text-xs-center" style="margin-top: 2rem">
        <v-btn :disabled="dialog" :loading="dialog" class="white--text" color="primary" @click="submit">提交</v-btn>
        <v-dialog v-model="dialog" hide-overlay persistent width="500">
          <v-card color="primary" dark>
            <v-card-text>正在提交
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <div style="width: 50rem;height:3rem;margin-top:2rem;margin-left: 2rem;background:#FFF;text-align:center"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "commonInfo",

    data () {
      return {
        nong:false, lin:false, shui:false, hai:false, sheng:false,
        guo:false, jiao:false, dian:false, zhu:false, cheng:false,
        zi:false, di:false, ye:false, shi:false, qi:false,
        selectNong: [],selectLin: [],selectShui: [],selectHai: [],selectSheng: [],
        selectGuo: [],selectJiao: [],selectDian: [],selectZhu: [],selectCheng: [],
        selectZi: [],selectDi: [],selectYe: [],selectShi: [],selectQi: [],
        items: ['农业', '林业', '水利', '海洋', '生态环保', '国土', '交通', '电力', '住建', '城市', '自然灾害', '地形地貌', '夜光', '视频', '其他行业',],
        itemsNong: ['农业资源调查', '作物长势', '墒情监测/旱情评价', '农业病虫害', '作物品质', '农业气象', '农业灾害', '作物估产', '农业工程设施', '农业生态环境', '其他'],
        itemsLin: ['森林类型提取', '森林生物量/碳储量/蓄积量估算', '森林火灾防控与预警', '森林病虫害防治', '野生动植物生境适宜性评价', '自然保护区', '其他'],
        itemsShui: ['地表水资源', '水质检测', '水土保持', '水深库容', '航道提取', '灌区', '水利设施', '其他'],
        itemsHai: ['海洋水色检测', '海洋灾害监测', '海水渔业检测', '海上目标检测', '海岛海岸带检测', '其他'],
        itemsSheng: ['水质检测', '大气气溶胶光学厚度监测', '生态环境评价', '荒漠化监测', '秸秆焚烧监测', '其他'],
        itemsGuo: ['土地利用分类', '土地督察与执法', '矿产资源调查', '地质灾害', '其他'],
        itemsJiao: ['道路规划', '路网检测', '道路设施检测', '道路灾害监测', '航道环境监测', '机场规划建设', '其他'],
        itemsDian: ['电网工程规划设施', '电网工程建筑施工', '运行监测', '其他'],
        itemsZhu: ['变化检测', '违法建筑执法', '违法建筑建筑执法', '特定目标识别', '其他'],
        itemsCheng: ['城市规划', '园林绿地', '其他'],
        itemsZi: ['地震', '火灾', '洪涝', '干旱', '冰雹', '其他'],
        itemsDi: ['数字表面模型', '数字高程模型', '其他'],
        itemsYe: ['灯光色彩分类', '灯光强度分级', '城市住房空置率估算', '城市功能区划分', '城市灯光发展指数', '其他'],
        itemsShi: ['动目标检测', '其他'],
        itemsQi: ['海关', '安全', '其他'],
        itemsQi1: [1,2,3],
      }
    },
    methods: {
      aa: function () {
        //this.select.contains("农业")
        //alert(this.select.indexOf("农业"));
        //alert(this.$store.state.fileInfo.directory.length);
        //alert("aa");

        if(this.select.indexOf("农业")!=-1) {this.nong=true;} else {this.nong=false;}
        if(this.select.indexOf("林业")!=-1) {this.lin=true;} else {this.lin=false;}
        if(this.select.indexOf("水利")!=-1) {this.shui=true;} else {this.shui=false;}
        if(this.select.indexOf("海洋")!=-1) {this.hai=true;} else {this.hai=false;}
        if(this.select.indexOf("生态环保")!=-1) {this.sheng=true;} else {this.sheng=false;}
        if(this.select.indexOf("国土")!=-1) {this.guo=true;} else {this.guo=false;}
        if(this.select.indexOf("交通")!=-1) {this.jiao=true;} else {this.jiao=false;}
        if(this.select.indexOf("电力")!=-1) {this.dian=true;} else {this.dian=false;}
        if(this.select.indexOf("住建")!=-1) {this.zhu=true;} else {this.zhu=false;}
        if(this.select.indexOf("城市")!=-1) {this.cheng=true;} else {this.cheng=false;}
        if(this.select.indexOf("自然灾害")!=-1) {this.zi=true;} else {this.zi=false;}
        if(this.select.indexOf("地形地貌")!=-1) {this.di=true;} else {this.di=false;}
        if(this.select.indexOf("夜光")!=-1) {this.ye=true;} else {this.ye=false;}
        if(this.select.indexOf("视频")!=-1) {this.shi=true;} else {this.shi=false;}
        if(this.select.indexOf("其他行业")!=-1) {this.qi=true;} else {this.qi=false;}
        //alert(this.date1[1]);
        //alert(this.$store.state.fileInfo.directory);


      }
    },
    computed: {
    },
    watch: {}
  }
</script>

<style scoped>

</style>
