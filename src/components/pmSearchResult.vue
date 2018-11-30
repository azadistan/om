<template>
  <div>
    <div class=""style="height:1rem;margin:0 0 2.3rem 0;font-family: 微软雅黑;color:grey;font-size: large;font-weight:bold;">
      <img src="../assets/titlePng.png" style="float:left;height:20px;margin:1rem 0 0 1rem">
      <div style="float:left;margin:0.7rem 0 0 1rem">查询结果</div>
    </div>
    <v-tabs id="pmSearchResultTab"
      color="white"
      show-arrows
      grow
      height="24"
      style="margin-left: 0px;"
      value="r2"
      v-model="pmSearchResultTab"
    >
      <v-tabs-slider color="blue"style="margin-left: 0px;"></v-tabs-slider>

      <v-tab href="#r1" disabled="true" @click="changeResultSta()">
        标准产品
      </v-tab>
      <v-tab class="elevation-1" href="#r2" @click="changeResultAdv()">
        高级产品
      </v-tab>
      <v-tab href="#r3" @click="changeResultSpe()">
        专题产品
      </v-tab>


      <v-tabs-items style="margin-top:0.25rem;">
        <v-tab-item
          id="r1"
          key="1"
        >
          <pm-sta-search-result></pm-sta-search-result>
        </v-tab-item>
        <v-tab-item
          id="r2"
          key="2"
        >
         <pm-adv-search-result></pm-adv-search-result>
        </v-tab-item>
        <v-tab-item
          id="r3"
          key="3"
        >
          <pm-spe-search-result></pm-spe-search-result>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
  import PmSpeSearchResult from './pmSpeSearchResult'
  import PmStaSearchResult from './pmStaSearchResult'
  import PmAdvSearchResult from './pmAdvSearchResult'

  export default {
    components: {
      PmAdvSearchResult,
      PmStaSearchResult,
      PmSpeSearchResult
    },
    data(){
      return{
        pmSearchResultTab:'r2',
      }
    },
    watch: {
      productResultChange: {
        handler () {
          if(this.$store.state.productResultNow ===1){
            this.pmSearchResultTab = 'r1'
          }
          if(this.$store.state.productResultNow ===2){
            this.pmSearchResultTab = 'r2'
          }
          if(this.$store.state.productResultNow ===3){
            this.pmSearchResultTab = 'r3'
          }
        },
        deep: true
      },
    },
    computed:{
      productResultChange:function () {
        return this.$store.state.productResultNow
      },
    },
    name: 'pm-search-result',
    methods:{
      changeResultSta(){
        this.$store.commit('productResultChange',1)
      },
      changeResultAdv(){
        this.$store.commit('productResultChange',2)
      },
      changeResultSpe(){
        this.$store.commit('productResultChange',3)
      },

    }
  }
</script>

<style scoped>

</style>
