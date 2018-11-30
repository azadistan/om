<template>
  <div style="width:30.25rem;height:42rem;margin:0px 0 0.5rem 0px;float:bottom; border-top:#e0e0e0 solid 1px;">
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="speResults"
    :pagination.sync="pagination"
    :rows-per-page-items="[100000]"
    select-all
    item-key="speId"
    hide-actions
    headers-length="4"
    style="height: 38.4rem"
  >
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning" outline>
        对不起，没有符合条件的查询结果
      </v-alert>
    </template>
    <template slot="headers" slot-scope="props">
      <tr style="border-bottom: 1px solid #C5C5C5">
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
          :key="speId"
        >
          <div style="background:#1978CB;color: white;height: 1.5rem;width: 5rem;cursor: pointer" @click="speMutiDownload()" href="javascript:;" rel="external nofollow">批量下载</div>
        </th>
      </tr>
    </template>
    <template slot="items" slot-scope="props" v-model="speResults">
      <tr >
        <td :active="props.selected" @click="props.selected = !props.selected">
          <v-checkbox
            :input-value="props.selected"
            primary
            hide-details
            style="margin: 0px 0rem 0 0rem;"
          ></v-checkbox>
        </td>

      <td :title=props.item.speName style="padding: 0 0rem 0 0rem;">{{omitName(props.item.speName)}}</td>
      <td :title=props.item.speIndustry style="padding: 0 0rem 0 0rem">{{ omitName(props.item.speIndustry) }}</td>
      <td
      >
        <span style="color: #1978CB;cursor: pointer" @click="speDetailsClick(props.item.speId)">详情</span>
        <span>  |  </span>
        <span :title=props.item.speDownload class="speDownload" style="color: #1978CB;cursor: pointer"@click="speDownloadClick(props.item.speDownload)">下载</span>
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
  export default {
    name: 'pm-spe-search-result',
    data(){
     return{
       page:1,
       pageTotal:1,
       speIdNow:'',
       speCheckbox:'',
       seen:false,
       pagination: {
         sortBy: 'speId'
       },
       selected: [],
       headers: [
         {
           text: '专题名称',
           align: 'left',
           value: 'speName'
         },
         { text: '所属行业', value: 'speIndustry' }
       ],
       speResults1: [
         {
           speId:1,
           value: false,
           speName: '长春热岛效应1',
           speIndustry: "农业 林业 畜牧业",
           speDownload: "http://192.168.20.7:8079/专题产品/长春市201309热岛效应test/4/长春热岛201607.tfw"
         },
         {
           speId:2,
           value: false,
           speName: '吉林热岛效应4',
           speIndustry: "农业 林业 畜牧业",
           speDownload: "http://192.168.20.7:8079/专题产品/长春市201309热岛效应test/长春市201309热岛效应test.zip"
         },
         {
           speId:3,
           value: false,
           speName: '北京热岛效应5',
           speIndustry: "农业 林业 畜牧业",
           speDownload: "http://192.168.20.7:8079/专题产品/长春市201309热岛效应test/4/长春热岛201607.tfw"
         },
         {
           speId:4,
           value: false,
           speName: 'Ice111111111',
           speIndustry: "1111111",
           speDownload: "http://192.168.20.7:8079/专题产品/长春市201309热岛效应test/长春市201309热岛效应test.zip"
         },
         {
           speId:5,
           value: false,
           speName: '长春热岛效应2',
           speIndustry: "农业 林业 畜牧业",
           speDownload: "http://192.168.20.7:8079/专题产品/长春市201309热岛效应test/长春市热岛效应产品.pdf"
         },
         {
           speId:6,
           value: false,
           speName: '长春热岛效应3',
           speIndustry: "农业 林业 畜牧业",
           speDownload: "http://192.168.20.7:8079/专题产品/长春市201309热岛效应test/4/长春热岛201607.tfw"
         },
       ],
       speResults:[]
     }
    },
    mounted(){
    },
    methods: {
      toggleAll () {
        if (this.selected.length === this.speResults.length) {
          this.selected = []
        }

        else {
          this.selected = this.speResults.slice()
        }
      },
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
      },
      speDownloadClick (url) {
        window.open(url);
      },
      speMutiDownload () {
        var length = this.selected.length
        if(length === 0){alert("请选择至少一个产品进行下载")}
        for (var i = 0; i < length; i++) {
          var link = document.createElement('a')
          link.setAttribute('download', '')
          link.href = this.selected[i].speDownload
          link.click()
        }

      },
      speDetailsClick(id){
        alert(id)
      }
    },
    watch:{
      speResultsChange: {
        handler () {
          this.selected = []
          this.speResults = this.$store.state.speResultsNow
        },
        deep: true
      },
      selected:{
        handler:function(val){

          var length = val.length
          var speGeoJson = []
          for(var i=0;i<length;i++){
            speGeoJson.push(val[i].speGeoJson)
          }
          this.$store.commit('speGeoJsonSelectChange',speGeoJson)
        }
      },
      spePageTotalChange:{
        handler () {
          this.pageTotal = this.$store.state.spePageTotalNow
        },
        deep: true
      },
      page:{
        handler (val) {
          this.$store.commit('spePageChange',val)
        },
        deep: true
      },
    },
    computed:{
      speResultsChange:function () {
        return this.$store.state.speResultsNow
      },
      spePageTotalChange:function () {
        return this.$store.state.spePageTotalNow
      },
    },

  }
</script>

<style scoped>

</style>
