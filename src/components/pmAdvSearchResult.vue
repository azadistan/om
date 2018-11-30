<template>
  <div style="width:30.25rem;height:42rem;margin:0px 0 0.5rem 0px;float:bottom; border-top:#e0e0e0 solid 1px;">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="advResults"
      :pagination.sync="pagination"
      :rows-per-page-items="[100000]"
      select-all
      item-key="advId"
      style="height: 38.4rem"
      hide-actions
      headers-length="5"
    >
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning" outline>
          对不起，没有符合条件的查询结果
        </v-alert>
      </template>
      <template slot="headers" slot-scope="props">
        <tr>
          <th style="padding: 0 -10px 0 0">
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.native="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            style="padding: 0 2.5rem 0 0"
          >
            {{ header.text }}
          </th>
          <th
            :key="advId"
          ><div style="background:#1978CB;color: white;height: 1.5rem;width: 5rem;margin-left: -25px;cursor: pointer" @click="advMutiDownload()" href="javascript:;" rel="external nofollow">批量下载</div></th>
        </tr>
      </template>
      <template slot="items" slot-scope="props" v-model="advResults">
        <tr style="border-bottom: 1px solid #C5C5C5">
          <td :active="props.selected" @click="props.selected = !props.selected">
            <v-checkbox
              :input-value="props.selected"
              primary
              hide-details
              style="margin: 2px 0rem 0 0rem;"
              v-bind:id="props.item.advId+'2'"
            ></v-checkbox>
          </td>

        <td :title=props.item.advThumbUrl style="padding: 0.5rem 0rem 0 0rem;">
          <img style="height: 2rem;width: 2rem;margin-left: -10px" v-bind:src=props.item.advThumbUrl>
          <img v-bind:id=props.item.advId @click="advThumbUrlClick(props.item.advId)" style="margin: 0 0 0.4rem 0.5rem" src="../assets/eyeoff.png">
          <img v-bind:id="props.item.advId+'1'" @click="advThumbUrlClick1(props.item.advId)" style="display:none;margin: 0 0 0.4rem 0.5rem" src="../assets/eyeon.png">
        </td>
        <td :title=props.item.advName style="padding: 0 0rem 0 0rem;">{{omitName(props.item.advName)}}</td>
        <td :title=props.item.advType style="padding: 0 0rem 0 0rem">{{ omitName(props.item.advType) }}</td>
        <td :title=props.item.advDownloadTmp style="padding: 0 0rem 0 0rem"
        >
          <span style="color: #1978CB;cursor: pointer" @click="advDetailsClick(props.item.advId)">详情</span>
          <span>  |  </span>
          <span :title=props.item.advDownload class="advDownload" style="color: #1978CB;cursor: pointer"@click="advDownloadClick(props.item.advDownload)">下载</span>
        </td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-center" style="margin-top: 0.5rem">
      <v-pagination
        v-model="page"
        :length="pageTotal"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>


</template>

<script>
  export const downloadFile = (url) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none"; // 防止影响页面
    iframe.style.height = 0; // 防止影响页面
    iframe.src = url;
    document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
    // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
    setTimeout(()=>{
      iframe.remove();
    }, 5 * 60 * 1000);
  }

  export default {
    name: 'pm-adv-search-result',
    data(){
      return{
        pageTotal:1,
        page: 1,
        advIdNow:'',
        advCheckbox:'',
        seen:false,
        pagination: {
          sortBy: 'advId'
        },
        selected: [],
        headers: [
          {
            text: '缩略图',
            align: 'left',
            value: 'advThumbUrl'
          },
          {
            text: '产品名称',
            align: 'left',
            value: 'advName'
          },
          { text: '产品类型', value: 'advType' }
        ],
        advResults1: [
          {
            advId:1,
            value: false,
            advThumbUrl:'缩略图1',
            advName: '长春热岛效应1',
            advType: "农业 林业 畜牧业",
            advDownload: "http://192.168.20.7:8079/专题产品/长春市201309热岛效应test/4/长春热岛201607.tfw",
            advDownloadTmp:''
          },
          {
            advId:2,
            value: false,
            advThumbUrl:'缩略图2',
            advName: '吉林热岛效应4',
            advType: "农业 林业 畜牧业",
            advDownload: "http://192.168.20.7:8079/专题产品/长春市201309热岛效应test/长春市201309热岛效应test.zip",
            advDownloadTmp:''
          },
          {
            advId:3,
            value: false,
            advThumbUrl:'缩略图3',
            advName: '北京热岛效应5',
            advType: "农业 林业 畜牧业",
            advDownload: "http://192.168.20.7:8079/专题产品/长春市201309热岛效应test/4/长春热岛201607.tfw",
            advDownloadTmp:''
          },
          {
            advId:4,
            value: false,
            advThumbUrl:'缩略图4',
            advName: 'Ice111',
            advType: "111",
            advDownload: "http://192.168.20.7:8079/专题产品/长春市201309热岛效应test/长春市201309热岛效应test.zip",
            advDownloadTmp:''
          },
          {
            advId:5,
            value: false,
            advThumbUrl:'缩略图5',
            advName: '长春热岛效应2',
            advType: "农业 林业 畜牧业",
            advDownload: "http://192.168.20.7:8079/专题产品/长春市201309热岛效应test/长春市热岛效应产品.pdf",
            advDownloadTmp:''
          },
          {
            advId:6,
            value: false,
            advThumbUrl:'缩略图6',
            advName: '长春热岛效应3',
            advType: "农业 林业 畜牧业",
            advDownload: "http://192.168.20.7:8079/专题产品/长春市201309热岛效应test/4/长春热岛201607.tfw",
            advDownloadTmp:''
          },
        ],
        advResults:[],
        advThumbUrlIdSelect:[]
      }
    },
    mounted(){
    },
    methods: {
      toggleAll () {
        if (this.selected.length === this.advResults.length) {
          this.selected = []
        }
        else {
          this.selected = this.advResults.slice()
        }
      },//高级产品方框点选逻辑
      omitName (str) {
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
          charCode = str.charCodeAt(i);
          if (charCode >= 0 && charCode <= 128) realLength += 1;
          else realLength += 2;
        }
        if (realLength > 12) {
          return str.substring(0, 5) + "..."
          return str
        }
        else
          return str
      },//查询结果长字符串转换为省略字符串
      advDownloadClick (url) {
        window.open(url);
      },//下载按钮
      advMutiDownload () {
        var length = this.selected.length
        if(length === 0){alert("请选择至少一个产品进行下载")}
        for (var i = 0; i < length; i++) {
          var link = document.createElement('a')
          link.setAttribute('download', '')
          link.href = this.selected[i].advDownload
          link.click()
        }

      },//批量下载按钮
      advThumbUrlClick(id){
        this.advThumbUrlIdSelect.push(id)
        document.getElementById(id).style.display='none'
        document.getElementById(id+'1').style.display=''
      },
      advThumbUrlClick1(id){
        document.getElementById(id).style.display=''
        document.getElementById(id+'1').style.display='none'
        var length = this.advThumbUrlIdSelect.length
        var tmpAdvThumbUrlIdSelect = []
        for(var i=0;i<length;i++){
          if(this.advThumbUrlIdSelect[i] === id){
          }
          else {
            tmpAdvThumbUrlIdSelect.push(this.advThumbUrlIdSelect[i])
          }
        }
        this.advThumbUrlIdSelect = tmpAdvThumbUrlIdSelect
      },
      advDetailsClick(id){
        alert(id)
      }
    },
    watch:{
      advResultsChange: {
        handler () {

          this.selected = []
          this.advResults = this.$store.state.advResultsNow
        },
        deep: true
      },
      selected:{
        handler:function(val){
          var length = val.length
          var speGeoJson = []
          for(var i=0;i<length;i++){
            speGeoJson.push(val[i].advGeoJson)
          }
          this.$store.commit('speGeoJsonSelectChange',speGeoJson)
        }
      },
      advThumbUrlIdSelect:{
        handler:function(val){
          var urlAndJson = []
          var length = this.advResults.length
          var length1 = val.length
          for(var i=0;i<length1;i++){
            for(var j=0;j<length;j++){
              if(val[i] === this.advResults[j].advId){
                urlAndJson.push([this.advResults[j].advThumbnailUrl,this.advResults[j].advGeoJson.coordinates])
              }
            }
          }
          this.$store.commit('advUrlAndJsonChange',urlAndJson)
        }
      },
      advPageTotalChange:{
        handler () {
          this.pageTotal = this.$store.state.advPageTotalNow
        },
        deep: true
      },
      page:{
        handler (val) {
          this.$store.commit('advPageChange',val)
        },
        deep: true
      },

    },
    computed:{
      advResultsChange:function () {
        return this.$store.state.advResultsNow
      },
      advPageTotalChange:function () {
        return this.$store.state.advPageTotalNow
      },
    },
  }
</script>

<style scoped>

</style>
