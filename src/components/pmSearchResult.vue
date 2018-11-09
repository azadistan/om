<template>
  <div>
    <div class=""style="height:1rem;margin-bottom: 1rem;margin-left:12.5rem;font-family: 微软雅黑;color:grey;font-size: large;font-weight:bold;">查询结果</div>
    <v-tabs
      color="white"
      show-arrows
      grow
      height="24"
      style="margin-left: 0px;"
    >
      <v-tabs-slider color="blue"style="margin-left: 0px;"></v-tabs-slider>

      <v-tab href="#tab-1">
        标准产品
      </v-tab>
      <v-tab class="elevation-1" href="#tab-2">
        高级产品
      </v-tab>
      <v-tab href="#tab-3">
        专题产品
      </v-tab>


      <v-tabs-items style="margin-top:0.25rem;">
        <v-tab-item
          id="tab-1"
          key="1"
        >
          <pm-sta-search-result></pm-sta-search-result>
        </v-tab-item>
        <v-tab-item
          id="tab-2"
          key="2"
        >
         <pm-adv-search-result></pm-adv-search-result>
        </v-tab-item>
        <v-tab-item
          id="tab-3"
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
      PmSpeSearchResult},
    name: 'pm-search-result'
  }
</script>

<style scoped>

</style>
