<template>

  <v-layout style="background:#0e1932;height:100%">
    <div style="float:bottom;background:#1A263D;height:100%">
      <omList></omList>
    </div>
    <div style="float:bottom;">
      <om-device-group>
      </om-device-group>
      <om-device-list></om-device-list>
    </div>


  </v-layout>
</template>

<script>
  import omList from '@/components/omList'
  import omTopology from '@/components/omTopology'
  import omCharts from '@/components/omCharts'
  import omDeviceList from '@/components/omDeviceList'
  import omDeviceGroup from '@/components/omDeviceGroup'
  export default {
    name: 'om-main-page',
    components: {
      omCharts,
      omList,
      omDeviceGroup,
      omDeviceList
    }
  }
</script>

<style scoped>

</style>
