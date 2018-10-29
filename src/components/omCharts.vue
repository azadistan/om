<template>
  <div style="background:#F5F5F5">omCharts
    <div id="myChart" :style="{width: '30rem', height: '30rem'}">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'om-charts',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
      this.drawLine()
    },
    methods: {
      getData(){
        this.$axios.get('https://dsn.apizza.net/mock/59b16ce95a2e38a5a0bd82dbb1c70d6b/getuser')
          .then(resp => {
            this.test1 = resp.data.name
          }).catch(err => {             //
          alert('请求失败：'+err.status+','+err.statusText);
        });
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        var test2;

        myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          xAxis: {
            name: '参数',
            data: []
          },
          yAxis: {},
          series: [{
            name: '数据',
            type: 'bar',
            data: []
          }]
        });
        myChart.showLoading();

        var names=[];
        var nums=[];

        this.$axios.get('https://dsn.apizza.net/mock/59b16ce95a2e38a5a0bd82dbb1c70d6b/getuser')
          .then(resp => {
            for(var i=0;i<resp.data.name.length;i++){
              names.push(resp.data.name[i]);    //挨个取出类别并填入类别数组
              nums.push(resp.data.num[i]);    //挨个取出销量并填入销量数组
            };

            myChart.hideLoading();    //隐藏加载动画
            myChart.setOption({
              title: { text: '在Vue中使用echarts' },
              tooltip: {},
              xAxis: {
                name: '参数',
                data: names
              },
              yAxis: {},
              series: [{
                name: '数据',
                type: 'bar',
                data: nums
              }],
              color:['black']
            });

          }).catch(err => {             //
          alert('请求失败：'+err.status+','+err.statusText);
        })
      },

    },
  }
</script>

<style scoped>

</style>
