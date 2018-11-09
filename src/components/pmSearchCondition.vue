<template>
  <div  class="elevation-1" style="width:26.25rem;margin:2rem 0 2rem 2rem;float: bottom">
    <div style="height:1rem;margin-bottom: 1rem;margin-left:10.5rem;font-family: 微软雅黑;color:grey;font-size: large;font-weight:bold;">查询条件</div>
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
      <v-tab  class="elevation-1" href="#tab-2">
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
          <pm-sta-search-condition></pm-sta-search-condition>
        </v-tab-item>
        <v-tab-item
          id="tab-2"
          key="2"
        >
          <pm-adv-search-condition></pm-adv-search-condition>
        </v-tab-item>
        <v-tab-item
          id="tab-3"
          key="3"
        >
          <pm-spe-search-condition></pm-spe-search-condition>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
  import PmSpeSearchCondition from './pmSpeSearchCondition'
  import PmStaSearchCondition from './pmStaSearchCondition'
  import PmAdvSearchCondition from './pmAdvSearchCondition'

  export default {
    components: {
      PmAdvSearchCondition,
      PmStaSearchCondition,
      PmSpeSearchCondition},
    name: 'pm-search-condition'
  }
</script>

<style scoped>

</style>
