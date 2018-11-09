<template>
  <div style="width:26.25rem;margin:0rem 0 2px 0px;float:bottom;border-top:#e0e0e0 solid 1px;">
    <div>
      <v-textarea name="input-7-1" label="请输入专题描述"v-model="productDescription" value="" rows="1" style="margin-left:2rem;margin-top: 0rem;width:22rem;"></v-textarea>
    </div>
    <div style="margin-top: 0rem">
      <!--<div class="term-text2" style="margin-left: 2.5rem" ><span style="color: #ff0000;">* </span></div>-->

      <v-combobox style="margin-top:-1rem;margin-left: 2rem;width:22rem;"  v-model="select" :items="items" label="选择一级行业" multiple chips @change="aa">
        <template slot="selection" slot-scope="data">
          <v-chip  :selected="data.selected" :disabled="data.disabled" :key="JSON.stringify(data.item)" class="v-chip--select-multi"   @input="data.parent.selectItem(data.item)">
            <v-avatar  class="accent white--text"  v-text="data.item.slice(0, 1).toUpperCase()"></v-avatar>
            {{ data.item }}
          </v-chip>
        </template>
      </v-combobox>

      <div v-show="nong">
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/nong.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox  style="width:20rem;margin-left:2rem;margin-top: -1rem;" v-model="selectNong" :items="itemsNong" label="选择农业二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="lin" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/lin.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectLin" :items="itemsLin" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="shui" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/shui.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectShui" :items="itemsShui" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="hai" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/hai.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectHai" :items="itemsHai" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="sheng" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/sheng.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectSheng" :items="itemsSheng" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="guo" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/guo.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectGuo" :items="itemsGuo" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="jiao" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/jiao.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectJiao" :items="itemsJiao" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="dian" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/dian.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectDian" :items="itemsDian" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="zhu" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/zhu.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectZhu" :items="itemsZhu" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="cheng" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/cheng.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectCheng" :items="itemsCheng" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="zi" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/zi.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectZi" :items="itemsZi" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="di" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/di.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectDi" :items="itemsDi" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="ye" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/ye.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectYe" :items="itemsYe" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="shi" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/shi.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectShi" :items="itemsShi" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="qi" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/qi.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectQi" :items="itemsQi" item-value="itemsQi1" label="选择二级行业" multiple chips></v-combobox>
      </div>
    </div>
    <div style="">
      <v-autocomplete
        :items="serviceObject"
        placeholder="请输入或选择服务对象"
        no-data-text="对不起，没有该服务对象"
        clearable
        style="width: 22rem;margin: -1rem 0 0 2rem"
      ></v-autocomplete>
    </div>
    <div style="">
      <v-autocomplete
        :items="productObject"
        placeholder="请输入或选择生产人员"
        no-data-text="对不起，没有该生产人员"
        clearable
        style="width: 22rem;margin: -1rem 0 0 2rem"
      ></v-autocomplete>
    </div>
    <div style="width:4rem;height:1.5rem;margin:0 0 2rem 9rem">
      <v-btn flat color="primary">重置</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pm-spe-search-condition',
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
        serviceObject: [ 'Jrue Holiday', 'Blake Griffen', 'Kevin Durant','Jimmi Butler','Zack LaVine','Nikola Jokic'],
        productObject: [ 'Chris Paul', 'James Harden', 'Clint Capela','Eric Gordon','Carmelo Anthony','Zhou Qi'],
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
