<template>
  <div  class="elevation-1" style="width:26.25rem;margin:1rem 0 1rem 2rem;float: bottom">
    <div style="height:1rem;margin:0 0 2.3rem 0;font-family: 微软雅黑;color:grey;font-size: large;font-weight:bold;">
      <img src="../assets/titlePng.png" style="float:left;height:20px;margin:1rem 0 0 1rem">
      <div style="float:left;margin:0.7rem 0 0 1rem">查询条件</div>
    </div>
    <v-tabs
      color="white"
      show-arrows
      grow
      height="24"
      style="margin-left: 0px;"
      value="c2"
    >
      <v-tabs-slider color="blue"style="margin-left: 0px;"></v-tabs-slider>

      <v-tab href="#c1" @click="changeTypeSta()" disabled="true">
        标准产品
      </v-tab>
      <v-tab  class="elevation-1" href="#c2" @click="changeTypeAdv()">
        高级产品
      </v-tab>
      <v-tab href="#c3" @click="changeTypeSpe()">
        专题产品
      </v-tab>


      <v-tabs-items style="margin-top:0.25rem;">
        <v-tab-item
          id="c1"
          key="1"
        >
          <pm-sta-search-condition></pm-sta-search-condition>
        </v-tab-item>
        <v-tab-item
          id="c2"
          key="2"
        >
          <pm-adv-search-condition></pm-adv-search-condition>
        </v-tab-item>
        <v-tab-item
          id="c3"
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
    name: 'pm-search-condition',
    data () {
      return {

      }
    },
    methods: {
      changeTypeSta:function () {
        this.$store.commit('productTypeChange',1)
      },
      changeTypeAdv:function () {
        this.$store.commit('productTypeChange',2)
      },
      changeTypeSpe:function () {
        this.$store.commit('productTypeChange',3)
      },

    },

  }
</script>

<style scoped>

</style>
