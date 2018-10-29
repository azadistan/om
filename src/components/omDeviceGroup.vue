<template>
  <div style="width:90rem;height:15rem;margin:2rem 0 2rem 10rem;background:#1A263D">
    <div style="width:20rem;height:13rem;margin:0.5rem 0 0 2rem;float: left">
            <v-select
              :items="items"
              label="群组" dark color="grey" dense id="groupName" v-model="select"
            ></v-select>

    </div>
    <div id="omDeviceCount" style="width:15rem;height:14rem;margin:1rem 0 0 7rem;float: left">
    </div>
    <div id="omDeviceRun" style="width:15rem;height:14rem;margin:1rem 0 0 5rem;float: left">
    </div>
    <div id="omDeviceOS" style="width:15rem;height:14rem;margin:1rem 0 0 5rem;float: left">
    </div>
  </div>
</template>

<script>
  import OmCharts from './omCharts'
  var omDeviceCountData = {
    data1:'57',
    data2:'0',
    data1name:'当前群组',
    data2name:'其他群组',
    data1color:'#CDA9C6',
    data2color:'#aaaa55',
    centertext:'总数：56台'
  }
  var omDeviceRunData = {
    data1:'55',
    data2:'1',
    data1name:'运行设备',
    data2name:'故障设备',
    data1color:'#55aa77',
    data2color:'#bb4444',
    centertext:'总数：56台'
  }
  var omDeviceOSData = {
    data1:'18',
    data2:'38',
    data1name:'windows',
    data2name:'linux',
    data1color:'#4d9eb3',
    data2color:'#808080',
    centertext:'总数：56台'
  }
  export default {
    components: {OmCharts},

    name: 'om-device-group',
    data () {
      return {
        select:'',
        items: ['计算集群', '数据一室服务器', '数据二/三室Linux服务器', '数据二/三室Windows服务器']
      }
    },
    watch: {
      select: {
        handler:function(val,oldval){
          switch (val) {
            case '计算集群':
              omDeviceCountData = {
                data1: '24',
                data2: '32',
                data1name: '计算集群',
                data2name: '其他群组',
                data1color: '#CDA9C6',
                data2color: '#aaaa55',
                centertext: '总数：56台'
              },
                omDeviceRunData = {
                  data1: '24',
                  data2: '0',
                  data1name: '运行设备',
                  data2name: '故障设备',
                  data1color: '#55aa77',
                  data2color: '#bb4444',
                  centertext: '总数：24台'
                },
                omDeviceOSData = {
                  data1: '0',
                  data2: '24',
                  data1name: 'windows',
                  data2name: 'linux',
                  data1color: '#4d9eb3',
                  data2color: '#808080',
                  centertext: '总数：24台'
                };
              break;
            case '数据一室服务器':
              omDeviceCountData = {
                data1: '9',
                data2: '45',
                data1name: '数据一室服务器',
                data2name: '其他群组',
                data1color: '#CDA9C6',
                data2color: '#aaaa55',
                centertext: '总数：56台'
              },
                omDeviceRunData = {
                  data1: '9',
                  data2: '0',
                  data1name: '运行设备',
                  data2name: '故障设备',
                  data1color: '#55aa77',
                  data2color: '#bb4444',
                  centertext: '总数：9台'
                },
                omDeviceOSData = {
                  data1: '0',
                  data2: '9',
                  data1name: 'windows',
                  data2name: 'linux',
                  data1color: '#4d9eb3',
                  data2color: '#808080',
                  centertext: '总数：9台'
                };
              break;
            case '数据二/三室Linux服务器':
              omDeviceCountData = {
                data1: '5',
                data2: '51',
                data1name: '数据二/三室Linux服务器',
                data2name: '其他群组',
                data1color: '#CDA9C6',
                data2color: '#aaaa55',
                centertext: '总数：56台'
              },
                omDeviceRunData = {
                  data1: '4',
                  data2: '1',
                  data1name: '运行设备',
                  data2name: '故障设备',
                  data1color: '#55aa77',
                  data2color: '#bb4444',
                  centertext: '总数：5台'
                },
                omDeviceOSData = {
                  data1: '0',
                  data2: '5',
                  data1name: 'windows',
                  data2name: 'linux',
                  data1color: '#4d9eb3',
                  data2color: '#808080',
                  centertext: '总数：5台'
                };
              break;
            case '数据二/三室Windows服务器':
              omDeviceCountData = {
                data1: '18',
                data2: '38',
                data1name: '数据二/三室Windows服务器',
                data2name: '其他群组',
                data1color: '#CDA9C6',
                data2color: '#aaaa55',
                centertext: '总数：56台'
              },
                omDeviceRunData = {
                  data1: '18',
                  data2: '0',
                  data1name: '运行设备',
                  data2name: '故障设备',
                  data1color: '#55aa77',
                  data2color: '#bb4444',
                  centertext: '总数：18台'
                },
                omDeviceOSData = {
                  data1: '18',
                  data2: '0',
                  data1name: 'windows',
                  data2name: 'linux',
                  data1color: '#4d9eb3',
                  data2color: '#808080',
                  centertext: '总数：18台'
                };
              break;
            default:
              omDeviceCountData = {
                data1: '56',
                data2: '0',
                data1name: '当前群组',
                data2name: '其他群组',
                data1color: '#CDA9C6',
                data2color: '#aaaa55',
                centertext: '总数：56台'
              },
                omDeviceRunData = {
                  data1: '55',
                  data2: '1',
                  data1name: '运行设备',
                  data2name: '故障设备',
                  data1color: '#55aa77',
                  data2color: '#bb4444',
                  centertext: '总数：56台'
                },
                omDeviceOSData = {
                  data1: '18',
                  data2: '38',
                  data1name: 'windows',
                  data2name: 'linux',
                  data1color: '#4d9eb3',
                  data2color: '#808080',
                  centertext: '总数：56台'
                };
              break;
          }
          this.drawDevice('omDeviceCount',omDeviceCountData.data1,omDeviceCountData.data2,omDeviceCountData.data1name,omDeviceCountData.data2name,omDeviceCountData.data1color,omDeviceCountData.data2color,omDeviceCountData.centertext)
          this.drawDevice('omDeviceRun',omDeviceRunData.data1,omDeviceRunData.data2,omDeviceRunData.data1name,omDeviceRunData.data2name,omDeviceRunData.data1color,omDeviceRunData.data2color,omDeviceRunData.centertext)
          this.drawDevice('omDeviceOS',omDeviceOSData.data1,omDeviceOSData.data2,omDeviceOSData.data1name,omDeviceOSData.data2name,omDeviceOSData.data1color,omDeviceOSData.data2color,omDeviceOSData.centertext)
        },
        deep:true
      }
    },
    mounted(){
      this.drawDevice('omDeviceCount',omDeviceCountData.data1,omDeviceCountData.data2,omDeviceCountData.data1name,omDeviceCountData.data2name,omDeviceCountData.data1color,omDeviceCountData.data2color,omDeviceCountData.centertext)
      this.drawDevice('omDeviceRun',omDeviceRunData.data1,omDeviceRunData.data2,omDeviceRunData.data1name,omDeviceRunData.data2name,omDeviceRunData.data1color,omDeviceRunData.data2color,omDeviceRunData.centertext)
      this.drawDevice('omDeviceOS',omDeviceOSData.data1,omDeviceOSData.data2,omDeviceOSData.data1name,omDeviceOSData.data2name,omDeviceOSData.data1color,omDeviceOSData.data2color,omDeviceOSData.centertext)
    },
    methods: {
      drawDevice (echartid,data1,data2,data1name,data2name,data1color,data2color,centertext) {
        let omDeviceCount = this.$echarts.init(document.getElementById(echartid))
        omDeviceCount.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            textStyle:{
              color:'white',
              fontSize:3
            },
            data:[data1name,data2name]
          },
          series: [
            {
              name:'数量',
              type:'pie',
              radius: ['50%', '70%'],
              hoverAnimation:false,
              avoidLabelOverlap: false,
              color:[data1color,data2color],
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  formatter:function(){
                    return centertext
                  },
                  textStyle:{
                    fontSize:10,
                    color:'white'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:data1, name:data1name},
                {value:data2, name:data2name}
              ]
            }
          ]
        })
      },
    }
  }
</script>

<style scoped>

</style>
