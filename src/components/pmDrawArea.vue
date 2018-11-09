<template>
  <div style="width:26.25rem;margin:0px 0 1rem 0px;float: bottom;border-top:#e0e0e0 solid 1px;">
    <div style="width:25.5rem;height:3.5rem;float: bottom;margin:1rem 0 0 1rem">
      <v-btn style="float: left"  small depressed>
        <v-icon>check_box_outline_blank</v-icon>矩形
      </v-btn>
      <v-btn style="float: left;"  small depressed>
        <v-icon>radio_button_unchecked</v-icon>圆形
      </v-btn>
      <v-btn style="float: left;"  small depressed>
        <v-icon>panorama_horizontal</v-icon>绘制多边形
      </v-btn>
    </div>
    <div style="width:25.5rem;float: bottom;">
      <v-btn flat color="primary" style="margin-left: 9.45rem;" >重置</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pm-draw-area'
  }
</script>

<style scoped>

</style>
