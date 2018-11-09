<template>
  <div  class="elevation-1" style="width:26.25rem;margin:2rem 0 0 2rem;float: bottom">
    <div style="height:1rem;margin-bottom: 1rem;margin-left:9rem;font-family: 微软雅黑;color:grey;font-size: large;font-weight:bold;">目标地理范围</div>
    <v-tabs
      color="white"
      show-arrows
      height="24"
      grow
    >
      <v-tabs-slider color="blue"style="margin-left: 0px;"></v-tabs-slider>

      <v-tab href="#tab-1">
        行政区域
      </v-tab>
      <v-tab  class="elevation-1" href="#tab-2">
        国外
      </v-tab>
      <v-tab href="#tab-3">
        经纬度
      </v-tab>
      <v-tab  class="elevation-1" href="#tab-4">
        绘制区域
      </v-tab>
      <v-tab href="#tab-5">
        上传文件
      </v-tab>

      <v-tabs-items style="margin-top:0.25rem;">
        <v-tab-item
          id="tab-1"
          key="1"
        >
          <div style="width:26.25rem;height:8rem;margin:0rem 0 2px 0px;float: bottom;border-top:#e0e0e0 solid 1px;">
            <div style="width:26.25rem;height:4.5rem;">
              <div style="float: left;height: 2rem;width: 6.3rem;margin:0 0 1rem 2.2rem;">
                <v-select
                  :items="items"
                  label="省份"
                ></v-select>
              </div>
              <div style="float: left;height: 2rem;width: 6.3rem;margin:0 0 1rem 1rem;">
                <v-select
                  :items="items"
                  label="城市"
                ></v-select>
              </div>
              <div style="float: left;height: 2rem;width: 6.3rem;margin:0 0 1rem 1rem;">
                <v-select
                  :items="items"
                  label="区县"
                ></v-select>
              </div>
            </div>
            <div style="width:26.25rem;height:2rem;">
              <div style="width:4rem;float:left;height:1.5rem;margin-left: 4rem">
                <v-btn flat color="primary">确认</v-btn>
              </div>
              <div style="width:4rem;float:left;height:1.5rem;margin-left: 4rem">
                <v-btn flat color="primary">重置</v-btn>
              </div>
            </div>
          </div>
        </v-tab-item>
        <v-tab-item
          id="tab-2"
          key="2"
        >
          <div style="width:26.25rem;height:8rem;margin:0rem 0 2px 0px;float: bottom;border-top:#e0e0e0 solid 1px;">
            <div style="width:25rem;height:4.5rem;">
              <div style="float: left;height: 2rem;width: 6.3rem;margin:0 0 1rem 5rem;">
                <v-select
                  :items="items"
                  label="国家"
                ></v-select>
              </div>
              <div style="float: left;height: 2rem;width: 6.3rem;margin:0 0 1rem 2rem;">
                <v-select
                  :items="items"
                  label="州"
                ></v-select>
              </div>
            </div>
            <div style="width:25rem;height:2rem;">
              <div style="width:4rem;float:left;height:1.5rem;margin-left: 4rem">
                <v-btn flat color="primary">确认</v-btn>
              </div>
              <div style="width:4rem;float:left;height:1.5rem;margin-left: 4rem">
                <v-btn flat color="primary">重置</v-btn>
              </div>
            </div>
          </div>
        </v-tab-item>
        <v-tab-item
          id="tab-3"
          key="3"
        >
          <pm-latitude></pm-latitude>
        </v-tab-item>
        <v-tab-item
          id="tab-4"
          key="4"
        >
          <pm-draw-area></pm-draw-area>
        </v-tab-item>
        <v-tab-item
          id="tab-5"
          key="5"
        >
          <pm-upload-files></pm-upload-files>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
  import PmLatitude from './pmLatitude'
  import PmUploadFiles from './pmUploadFiles'
  import PmDrawArea from './pmDrawArea'

  export default {
    components: {
      PmDrawArea,
      PmUploadFiles,
      PmLatitude},
    name: 'pm-search-range',
    data () {
      return {
        items: ['Foo', 'Bar', 'Fizz', 'Buzz']
      }
    }
  }
</script>

<style scoped>

</style>
