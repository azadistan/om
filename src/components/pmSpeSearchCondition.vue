<template>
  <div style="width:26.25rem;margin:0rem 0 2px 0px;float:bottom;border-top:#e0e0e0 solid 1px;">
    <div>
      <v-text-field name="input-7-1" label="请输入专题描述" v-model="speDescription" value="" rows="1" clearable style="margin-left:2rem;margin-top: 0.3rem;width:22rem;"></v-text-field>
    </div>

    <div style="">
      <v-autocomplete
        :items="serviceObject"
        label="请输入或选择服务对象"
        no-data-text="对不起，没有该服务对象"
        clearable
        style="width: 22rem;margin: -1rem 0 0 2rem"
        v-model="serviceObjectNow"
      ></v-autocomplete>
    </div>
    <div style="">
      <v-autocomplete
        :items="productObject"
        label="请输入或选择生产人员"
        no-data-text="对不起，没有该生产人员"
        clearable
        style="width: 22rem;margin: -1rem 0 0 2rem"
        v-model="productObjectNow"
      ></v-autocomplete>
    </div>
    <div style="margin-top: 0rem">
      <!--<div class="term-text2" style="margin-left: 2.5rem" ><span style="color: #ff0000;">* </span></div>-->
      <v-combobox style="margin-top:-1rem;margin-left: 2rem;width:22rem;"  clearable v-model="select" :items="items" label="选择一级行业" multiple chips @change="aa">
        <template slot="selection" slot-scope="data">
          <v-chip  :selected="data.selected" :disabled="data.disabled" :key="JSON.stringify(data.item)" class="v-chip--select-multi"   @input="data.parent.selectItem(data.item)">
            <v-avatar  class="accent white--text"  v-text="data.item.slice(0, 1).toUpperCase()"></v-avatar>
            {{ data.item }}
          </v-chip>
        </template>
      </v-combobox>
      <div v-show="nong">
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/nong.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem;" v-model="selectNong" :items="itemsNong" label="选择农业二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="lin" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/lin.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectLin" :items="itemsLin" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="shui" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/shui.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectShui" :items="itemsShui" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="hai" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/hai.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectHai" :items="itemsHai" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="sheng" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/sheng.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectSheng" :items="itemsSheng" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="guo" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/guo.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectGuo" :items="itemsGuo" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="jiao" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/jiao.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectJiao" :items="itemsJiao" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="dian" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/dian.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectDian" :items="itemsDian" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="zhu" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/zhu.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectZhu" :items="itemsZhu" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="cheng" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/cheng.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectCheng" :items="itemsCheng" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="zi" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/zi.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectZi" :items="itemsZi" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="di" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/di.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectDi" :items="itemsDi" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="ye" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/ye.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectYe" :items="itemsYe" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="shi" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/shi.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectShi" :items="itemsShi" label="选择二级行业" multiple chips></v-combobox>
      </div>
      <div v-show="qi" >
        <div class="term-text" style="margin-left: 1.6rem;margin-top:1.8rem;color:#FFFFFF; font-size:1.2rem;font-family:'微软雅黑';float: left"><img src="../assets/qi.png" style="width:2.5rem;margin-top:-1rem" /></div>
        <v-combobox clearable style="width:20rem;margin-left:2rem;margin-top: -1rem" v-model="selectQi" :items="itemsQi" item-value="itemsQi1" label="选择二级行业" multiple chips></v-combobox>
      </div>
    </div>
    <div style="width:4rem;height:1.5rem;margin:-1rem 0 2rem 9.5rem">
      <v-btn @click="pmSpeSearchConditionReset" flat color="primary">重置</v-btn>
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
        serviceObject: [],
        productObject: [],
        speDescription:'',
        select:[],
        productObjectNow:'',
        serviceObjectNow:'',
      }
    },
    mounted(){
      this.serviceAndProductObject()
    },
    methods: {
      aa: function () {
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


      },
      submit:function () {
        this.dialog = true;
        var industry= [];
        if(this.selectNong.length!=0)
        {
          for(var i=0;i<this.selectNong.length;i++)
          {
            switch (this.selectNong[i])
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
        if(this.selectLin.length!=0)
        {
          for(var i=0;i<this.selectLin.length;i++)
          {
            switch (this.selectLin[i])
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
        if(this.selectShui.length!=0)
        {
          for(var i=0;i<this.selectShui.length;i++)
          {
            switch (this.selectShui[i])
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
        if(this.selectHai.length!=0)
        {
          for(var i=0;i<this.selectHai.length;i++)
          {
            switch (this.selectHai[i])
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
        if(this.selectSheng.length!=0)
        {
          for(var i=0;i<this.selectSheng.length;i++)
          {
            switch (this.selectSheng[i])
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
        if(this.selectGuo.length!=0)
        {
          for(var i=0;i<this.selectGuo.length;i++)
          {
            switch (this.selectGuo[i])
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
        if(this.selectJiao.length!=0)
        {
          for(var i=0;i<this.selectJiao.length;i++)
          {
            switch (this.selectJiao[i])
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
        if(this.selectDian.length!=0)
        {
          for(var i=0;i<this.selectDian.length;i++)
          {
            switch (this.selectDian[i])
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
        if(this.selectZhu.length!=0)
        {
          for(var i=0;i<this.selectZhu.length;i++)
          {
            switch (this.selectZhu[i])
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
        if(this.selectCheng.length!=0)
        {
          for(var i=0;i<this.selectCheng.length;i++)
          {
            switch (this.selectCheng[i])
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
        if(this.selectZi.length!=0)
        {
          for(var i=0;i<this.selectZi.length;i++)
          {
            switch (this.selectZi[i])
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
        if(this.selectDi.length!=0)
        {
          for(var i=0;i<this.selectDi.length;i++)
          {
            switch (this.selectDi[i])
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
        if(this.selectYe.length!=0)
        {
          for(var i=0;i<this.selectYe.length;i++)
          {
            switch (this.selectYe[i])
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
        if(this.selectShi.length!=0)
        {
          for(var i=0;i<this.selectShi.length;i++)
          {
            switch (this.selectShi[i])
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
        if(this.selectQi.length!=0)
        {
          for(var i=0;i<this.selectQi.length;i++)
          {
            switch (this.selectQi[i])
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


      },
      serviceAndProductObject:function () {
        this.$axios.get("http://192.168.20.56:8077/clientlist").then((res) => {
          this.serviceObject = res.data.data
        })
          .catch(function (err) {
            console.log(err)
          })
        this.$axios.get("http://192.168.20.56:8077/producerlist").then((res) => {
          this.productObject = res.data.data
        })
          .catch(function (err) {
            console.log(err)
          })
      },
      pmSpeSearchConditionReset:function () {
        this.select = []
        this.speDescription = ''
        this.productObjectNow = ''
        this.serviceObjectNow = ''
        this.nong = false,this.lin = false,this.shui = false,this.hai = false,this.sheng = false
        this.guo = false,this.jiao = false,this.dian = false,this.zhu = false,this.cheng = false
        this.zi = false,this.di = false,this.ye = false,this.shi = false,this.qi = false
        this.selectNong = [],this.selectLin = [],this.selectShui = [],this.selectHai = [],this.selectSheng = [],
        this.selectGuo = [],this.selectJiao = [],this.selectDian = [],this.selectZhu = [],this.selectCheng = [],
        this.selectZi = [],this.selectDi = [],this.selectYe = [],this.selectShi = [],this.selectQi = []

      }
    },
    watch: {
      speDescription:{
        handler:function(val){
          if(val === null){this.$store.commit('speDescriptionChange','')}
          else{this.$store.commit('speDescriptionChange',val)}
        }
      },
      select:{
        handler:function(val){
          this.$store.commit('selectIndustryChange',val)
        }
      },
      selectNong:{
        handler:function(val){
          this.$store.commit('selectNongChange',val)
        }
      },
      selectLin:{
        handler:function(val){
          this.$store.commit('selectLinChange',val)
        }
      },
      selectShui:{
        handler:function(val){
          this.$store.commit('selectShuiChange',val)
        }
      },
      selectHai:{
        handler:function(val){
          this.$store.commit('selectHaiChange',val)
        }
      },
      selectSheng:{
        handler:function(val){
          this.$store.commit('selectShengChange',val)
        }
      },
      selectGuo:{
        handler:function(val){
          this.$store.commit('selectGuoChange',val)
        }
      },
      selectJiao:{
        handler:function(val){
          this.$store.commit('selectJiaoChange',val)
        }
      },
      selectDian:{
        handler:function(val){
          this.$store.commit('selectDianChange',val)
        }
      },
      selectZhu:{
        handler:function(val){
          this.$store.commit('selectZhuChange',val)
        }
      },
      selectCheng:{
        handler:function(val){
          this.$store.commit('selectChengChange',val)
        }
      },
      selectZi:{
        handler:function(val){
          this.$store.commit('selectZiChange',val)
        }
      },
      selectDi:{
        handler:function(val){
          this.$store.commit('selectDiChange',val)
        }
      },
      selectYe:{
        handler:function(val){
          this.$store.commit('selectYeChange',val)
        }
      },
      selectShi:{
        handler:function(val){
          this.$store.commit('selectShiChange',val)
        }
      },
      selectQi:{
        handler:function(val){
          this.$store.commit('selectQiChange',val)
        }
      },
      productObjectNow:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('productObjectChange','')
          }
          else{
            this.$store.commit('productObjectChange',val)
          }
        }
      },
      serviceObjectNow:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('serviceObjectChange','')
          }
          else{
            this.$store.commit('serviceObjectChange',val)
          }

        }
      },

    },
    computed: {
    },
  }
</script>

<style scoped>

</style>
