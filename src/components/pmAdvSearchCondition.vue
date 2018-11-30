<template>
  <div style="width:26.25rem;margin:0rem 0 1rem 0px;float:bottom;border-top:#e0e0e0 solid 1px;">
    <div style="margin: 1rem 0 0 1.5rem">
      <div style="float: left">
        <v-checkbox v-model="orthoProduct" color="primary" label="正射产品" style="margin: 0 0 -20px 0"></v-checkbox>
      </div>
      <div style="float: left;margin: 0 0 0 1rem">
        <v-checkbox v-model="inlayProduct" color="primary" label="镶嵌产品" style="margin: 0 0 -20px 0"></v-checkbox>
      </div>
      <div style="float: left;margin: 0 0 0 1rem">
        <v-checkbox v-model="subdivisionProduct" color="primary" label="分幅产品" style="margin: 0 0 -20px 0"></v-checkbox>
      </div>
    </div>
    <div>
      <v-text-field clearable name="input-7-1" label="产品名称" font-size="10px" v-model="advProductName" value="" rows="1" style="margin:0 0 0 2rem;width:22rem;"></v-text-field>
    </div>
    <div>
      <v-autocomplete
        :items="advProduceAddress"
        label="请输入或选择生产地点"
        no-data-text="对不起，没有该服生产地点"
        clearable
        style="width: 22rem;margin: -1rem 0 0 2rem"
        v-model="advProduceAddressNow"
      ></v-autocomplete>
    </div>
    <div>
      <v-autocomplete
        :items="advProducePerson"
        label="请输入或选择生产人员"
        no-data-text="对不起，没有该服生产人员"
        clearable
        style="width: 22rem;margin: -1rem 0 0 2rem"
        v-model="advProducePersonNow"
      ></v-autocomplete>
    </div>
    <div style="">
    <div style="width:10rem;float:left;margin: -22px 0 0 2rem">
        <v-menu
          :close-on-content-click="false"
          v-model="menu1"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="advProduceStartTime"
            label="生产起始时间"
            readonly
            clearable
          ></v-text-field>
          <v-date-picker v-model="advProduceStartTime" @input="menu1 = false"></v-date-picker>
        </v-menu>
    </div>
    <div style="width:10rem;float:left;margin: -22px 0 0 2rem">
      <v-menu
        :close-on-content-click="false"
        v-model="menu2"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="advProduceEndTime"
          label="生产结束时间"
          readonly
          clearable
        ></v-text-field>
        <v-date-picker v-model="advProduceEndTime" @input="menu2 = false"></v-date-picker>
      </v-menu>
    </div>
    </div>
    <div style="">
      <div style="width:10rem;float:left;margin: -22px 0 -20px 2rem">
        <v-menu
          :close-on-content-click="false"
          v-model="menu3"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="advDeliveryStartTime"
            label="交付起始时间"
            readonly
            clearable
          ></v-text-field>
          <v-date-picker v-model="advDeliveryStartTime" @input="menu3 = false"></v-date-picker>
        </v-menu>
      </div>
      <div style="width:10rem;float:left;margin: -22px 0 -20px 2rem">
        <v-menu
          :close-on-content-click="false"
          v-model="menu4"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="advDeliveryEndTime"
            label="交付结束时间"
            readonly
            clearable
          ></v-text-field>
          <v-date-picker v-model="advDeliveryEndTime" @input="menu4 = false"></v-date-picker>
        </v-menu>
      </div>
    </div>
    <div>
      <v-autocomplete
        :items="advDataDelivery"
        label="请输入或选择数据交付方式"
        no-data-text="对不起，没有该服数据交付方式"
        clearable
        style="width: 22rem;margin: -1rem 0 0 2rem"
        v-model="advDataDeliveryNow"
      ></v-autocomplete>
    </div>
    <div>
      <v-autocomplete
        :items="advDataDeliveryObject"
        label="请输入或选择数据交付对象"
        no-data-text="对不起，没有该数据交付对象"
        clearable
        style="width: 22rem;margin: -1rem 0 0 2rem"
        v-model="advDataDeliveryObjectNow"
      ></v-autocomplete>
    </div>
    <div style="width:4rem;height:1.5rem;margin:-1rem 0 2rem 9.5rem">
      <v-btn @click="pmAdvSearchConditionReset" flat color="primary">重置</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pm-adv-search-condition',
    data(){
      return{
        orthoProduct:false,
        inlayProduct:false,
        subdivisionProduct:false,
        advProductName:'',
        advProduceAddress:['休斯顿','洛杉矶','纽约','波士顿'],
        advProduceAddressNow:'',
        advProducePerson:['克里斯保罗','勒布朗詹姆斯','埃内斯坎特','戈登海沃德'],
        advProducePersonNow:'',
        advDataDelivery:['中投','突破','背打','远投'],
        advDataDeliveryNow:'',
        advDataDeliveryObject:['两分','二加一','罚球','三分'],
        advDataDeliveryObjectNow:'',
        date: new Date().toISOString().substr(0, 10),
        advProduceStartTime:'',
        advProduceEndTime:'',
        advDeliveryStartTime:'',
        advDeliveryEndTime:'',
        menu1: false,
        menu2: false,
        menu3: false,
        menu4: false,
      }
    },
    mounted(){
      this.advProduceAddressAndadvProducePersonAndadvDataDeliveryAndadvDataDeliveryObject()
    },
    methods:{
      pmAdvSearchConditionReset(){
        this.orthoProduct = false
        this.inlayProduct = false
        this.subdivisionProduct = false
        this.advProductName = ''
        this.advProduceAddressNow = ''
        this.advProducePersonNow = ''
        this.advDataDeliveryNow = ''
        this.advDataDeliveryObjectNow = ''
        this.advProduceStartTime = ''
        this.advProduceEndTime = ''
        this.advDeliveryStartTime = ''
        this.advDeliveryEndTime = ''
      },//高级查询重置函数
      advProduceAddressAndadvProducePersonAndadvDataDeliveryAndadvDataDeliveryObject:function () {
        this.$axios.get("http://192.168.20.56:8077/producerlist").then((res) => {
          this.advProducePerson = res.data.data
        })
          .catch(function (err) {
            console.log(err)
          })
        this.$axios.get("http://192.168.20.56:8077/delivernamelist").then((res) => {
          this.advDataDeliveryObject = res.data.data
        })
          .catch(function (err) {
            console.log(err)
          })
        this.$axios.get("http://192.168.20.56:8077/delivermethodlist").then((res) => {
          this.advDataDelivery = res.data.data
        })
          .catch(function (err) {
            console.log(err)
          })
        this.$axios.get("http://192.168.20.56:8077/producearealist").then((res) => {
          this.advProduceAddress = res.data.data
        })
          .catch(function (err) {
            console.log(err)
          })
      },//初始化高级产品查询内容
    },
    watch:{
      orthoProduct:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('orthoProductChange',false)
          }
          else{
            this.$store.commit('orthoProductChange',val)
          }
        }
      },
      inlayProduct:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('inlayProductChange',false)
          }
          else{
            this.$store.commit('inlayProductChange',val)
          }
        }
      },
      subdivisionProduct:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('subdivisionProductChange',false)
          }
          else{
            this.$store.commit('subdivisionProductChange',val)
          }
        }
      },
      advProductName:{
        handler:function(val){
          if(val === undefined || val === null){
            this.$store.commit('advProductNameChange','')
          }
          else{
            this.$store.commit('advProductNameChange',val)
          }
        }
      },
      advProduceAddressNow:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('advProduceAddressChange','')
          }
          else{
            this.$store.commit('advProduceAddressChange',val)
          }
        }
      },
      advProducePersonNow:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('advProducePersonChange','')
          }
          else{
            this.$store.commit('advProducePersonChange',val)
          }
        }
      },
      advDataDeliveryNow:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('advDataDeliveryChange','')
          }
          else{
            this.$store.commit('advDataDeliveryChange',val)
          }
        }
      },
      advDataDeliveryObjectNow:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('advDataDeliveryObjectChange','')
          }
          else{
            this.$store.commit('advDataDeliveryObjectChange',val)
          }
        }
      },
      advProduceStartTime:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('advProduceStartTimeChange','')
          }
          else{
            val =val +" 00:00:00"
            this.$store.commit('advProduceStartTimeChange',val)
          }
        }
      },
      advProduceEndTime:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('advProduceEndTimeChange','')
          }
          else{
            val =val +" 23:59:59"
            this.$store.commit('advProduceEndTimeChange',val)
          }
        }
      },
      advDeliveryStartTime:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('advDeliveryStartTimeChange','')
          }
          else{
            val =val +" 00:00:00"
            this.$store.commit('advDeliveryStartTimeChange',val)
          }
        }
      },
      advDeliveryEndTime:{
        handler:function(val){
          if(val === undefined){
            this.$store.commit('advDeliveryEndTimeChange','')
          }
          else{
            val =val +" 23:59:59"
            this.$store.commit('advDeliveryEndTimeChange',val)
          }

        }
      },
    }


  }
</script>

<style scoped>
</style>
